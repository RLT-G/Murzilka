from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer

from allauth.socialaccount.models import SocialAccount
from eth_account.messages import encode_defunct
from tonsdk.utils import Address
from tonclient.client import TonClient
from tonclient.types import ParamsOfVerifySignature, KeyPair

from django.core.handlers.wsgi import WSGIRequest
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from django.conf import settings

from web3 import Web3
import urllib.parse
import requests
import secrets
import random
import string
import base64


User = get_user_model()
w3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER_URL))


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


# ---------------------------------------- METAMASK ---------------------------------------- #
def generate_metamask_nonce():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=20))


class MetamaskNonceGenerationAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        metamask_wallet_address = request.data.get("wallet_address")
        if not metamask_wallet_address or not w3.is_address(metamask_wallet_address):
            return Response({"error": "Invalid address"}, status=status.HTTP_400_BAD_REQUEST)

        user, _ = User.objects.get_or_create(metamask_wallet_address=metamask_wallet_address)
        user.metamask_nonce = generate_metamask_nonce()
        user.save()
        return Response({"nonce": user.metamask_nonce})
    

class MetamaskVerifySignatureAndLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        metamask_wallet_address = request.data.get("wallet_address")
        signature = request.data.get("signature")

        user = get_object_or_404(User, metamask_wallet_address=metamask_wallet_address)
        message = f"Log in to Murzilka. Your nonce: {user.metamask_nonce}"
        encoded_message = encode_defunct(text=message)
        recovered_address = w3.eth.account.recover_message(encoded_message, signature=signature)
        
        if recovered_address.lower() != metamask_wallet_address.lower():
            return Response({"error": "Incorrect signature"}, status=status.HTTP_400_BAD_REQUEST)

        user.metamask_nonce = None
        refresh = RefreshToken.for_user(user)
        user.save()

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    

def get_metamask_balance(wallet_address):
    checksum_address = Web3.to_checksum_address(wallet_address)
    balance_wei = w3.eth.get_balance(checksum_address)
    balance_eth = w3.from_wei(balance_wei, 'ether')
    return balance_eth


class MetamaskBalanceAPIView(APIView):
    authentication_classes = [JWTAuthentication] 
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        wallet_address = user.metamask_wallet_address

        if not wallet_address:
            return Response({"error": "User has no linked wallet"}, status=400)

        balance = get_metamask_balance(wallet_address)

        return Response({"wallet_address": wallet_address, "balance": balance})
    
# ---------------------------------------- METAMASK ---------------------------------------- #


# ---------------------------------------- TONKEEPER  ---------------------------------------- #
class GetTonkeeperChallangeAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        wallet_address = request.data.get("wallet_address")
        if not wallet_address:
            return Response({"error": "Wallet address is required"}, status=400)

        challenge = secrets.token_hex(16)
        cache.set(f"ton_challenge_{wallet_address}", challenge, timeout=300)

        return Response({"challenge": challenge})


class VerifyTonkeeperSignatureAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        wallet_address = request.data.get("wallet_address")
        signature = request.data.get("signature")

        if not wallet_address or not signature:
            return Response({"error": "Missing parameters"}, status=400)

        challenge = cache.get(f"ton_challenge_{wallet_address}")
        if not challenge:
            return Response({"error": "Challenge expired or invalid"}, status=400)

        try:
            client = TonClient(config={"network": {"server_address": "net.ton.dev"}})

            decoded_signature = base64.b64decode(signature)

            params = ParamsOfVerifySignature(
                message=challenge.encode(),
                signature=decoded_signature,
                public_key=wallet_address
            )

            result = client.crypto.verify_signature(params)

            if not result.valid:
                return Response({"error": "Invalid signature"}, status=400)

            user, created = User.objects.get_or_create(tonkeeper_address=wallet_address)

            refresh = RefreshToken.for_user(user)
            return Response({
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
            })
        
        except Exception as e:
            return Response({"error": f"Internal error: {str(e)}"}, status=500)
# ---------------------------------------- TONKEEPER ---------------------------------------- #


# ---------------------------------------- TONKEEPER  ---------------------------------------- #
class TronLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        wallet_address = request.data.get("address")

        if not wallet_address:
            return Response({"error": "Не хватает данных"}, status=400)

        user, created = User.objects.get_or_create(tron_wallet_address=wallet_address)
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
        })
# ---------------------------------------- TONKEEPER  ---------------------------------------- #