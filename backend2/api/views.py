from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.core.handlers.wsgi import WSGIRequest
from drf_spectacular.utils import extend_schema

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from allauth.socialaccount.models import SocialAccount
from django.conf import settings
import urllib.parse
import requests


# Create your views here.
class CheckApiAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: WSGIRequest):
        data = {
            "status": "ok",
        }
        return Response(
            data=data,
            status=status.HTTP_200_OK
        )


# ---------------------------------------- AUTH ---------------------------------------- #
class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'access_token': str(token.access_token),
                'refresh_token': str(token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]


class GetGoogleLoginURLAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        google_auth_url = "https://accounts.google.com/o/oauth2/auth"
        params = {
            "client_id": settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "response_type": "code",
            "scope": "openid email profile",
            "access_type": "offline",
            "prompt": "consent",
        }
        login_url = f"{google_auth_url}?{urllib.parse.urlencode(params)}"
        return Response({"login_url": login_url})


class GetFacebookLoginURLAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        fb_auth_url = "https://www.facebook.com/v18.0/dialog/oauth"
        params = {
            "client_id": settings.SOCIAL_AUTH_FACEBOOK_KEY,
            "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
            "response_type": "code",
            "scope": "email,public_profile",
        }
        login_url = f"{fb_auth_url}?{urllib.parse.urlencode(params)}"
        return Response({"login_url": login_url})
    

User = get_user_model()


class GoogleLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get("code")
        if not code:
            return Response({"error": "Code is required"}, status=status.HTTP_400_BAD_REQUEST)

        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            "client_id": settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
            "client_secret": settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        }
        token_headers = {"Content-Type": "application/x-www-form-urlencoded"}

        token_response = requests.post(token_url, data=token_data, headers=token_headers)
        if token_response.status_code != 200:
            return Response({
                "error": "Invalid code",
                "data": token_response.json()
                }, status=status.HTTP_400_BAD_REQUEST)

        token_json = token_response.json()
        access_token = token_json.get("access_token")

        user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        user_info_headers = {"Authorization": f"Bearer {access_token}"}
        user_info_response = requests.get(user_info_url, headers=user_info_headers)

        if user_info_response.status_code != 200:
            return Response({"error": "Failed to fetch user info"}, status=status.HTTP_400_BAD_REQUEST)

        user_info = user_info_response.json()
        email = user_info.get("email")
        name = user_info.get("name")
        google_id = user_info.get("id")

        if not email:
            return Response({"error": "Email not provided by Google"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(email=email, defaults={"username": name})
        user.is_active = True
        user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    

User = get_user_model()


class FacebookLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get("code")
        if not code:
            return Response({"error": "Code is required"}, status=status.HTTP_400_BAD_REQUEST)

        token_url = "https://graph.facebook.com/v18.0/oauth/access_token"
        params = {
            "client_id": settings.SOCIAL_AUTH_FACEBOOK_KEY,
            "client_secret": settings.SOCIAL_AUTH_FACEBOOK_SECRET,
            "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
            "code": code,
        }
        token_response = requests.get(token_url, params=params)
        token_data = token_response.json()

        if "access_token" not in token_data:
            return Response({"error": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)

        access_token = token_data["access_token"]

        user_info_url = "https://graph.facebook.com/me"
        user_params = {"fields": "id,name,email", "access_token": access_token}
        user_response = requests.get(user_info_url, params=user_params)
        user_data = user_response.json()

        if "email" not in user_data:
            return Response({"error": "Email permission is required"}, status=status.HTTP_400_BAD_REQUEST)

        email = user_data["email"]
        name = user_data.get("name", "")

        user, created = User.objects.get_or_create(email=email, defaults={"username": name})

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
# ---------------------------------------- AUTH ---------------------------------------- #
