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
from datetime import datetime
from django.utils.timezone import now
from .models import Stake, UserCurrency
from nacl.exceptions import BadSignatureError
import base64
from solders.signature import Signature
from solders.pubkey import Pubkey
from base58 import b58decode
from nacl.exceptions import BadSignatureError


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
        wallet_address = request.data.get("wallet_address")
        if not wallet_address or not w3.is_address(wallet_address):
            return Response({"error": "Invalid address"}, status=status.HTTP_400_BAD_REQUEST)

        user, _ = User.objects.get_or_create(wallet_address=wallet_address, wallet='metamask')
        user.nonce = generate_metamask_nonce()
        user.username = f"metamask - {wallet_address}"
        user.save()

        user_currency, _ = UserCurrency.objects.get_or_create(user=user)
        return Response({"nonce": user.nonce})
    

class MetamaskVerifySignatureAndLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        wallet_address = request.data.get("wallet_address")
        signature = request.data.get("signature")

        user = get_object_or_404(User, wallet_address=wallet_address)
        message = f"Вход в Мурзилку. Ваш Nonce: {user.nonce}"
        encoded_message = encode_defunct(text=message)
        recovered_address = w3.eth.account.recover_message(encoded_message, signature=signature)
        
        if recovered_address.lower() != wallet_address.lower():
            return Response({"error": "Incorrect signature"}, status=status.HTTP_400_BAD_REQUEST)

        user.nonce = None
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
        wallet_address = user.wallet_address

        if not wallet_address:
            return Response({"error": "User has no linked wallet"}, status=400)

        balance = get_metamask_balance(wallet_address)

        return Response({"wallet_address": wallet_address, "balance": balance})
    
# ---------------------------------------- METAMASK ---------------------------------------- #

# ---------------------------------------- PHANTOM  ---------------------------------------- #
class PhantomVerifySignatureAndLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: WSGIRequest):
        try:
            wallet_address = request.data.get("public_key")
            message = request.data.get("message")
            signature = request.data.get("signature")

            if not wallet_address or not message or not signature:
                return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

            if not self.verify_signature(wallet_address, message, signature):
                return Response({"error": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)

            user, _ = User.objects.get_or_create(wallet_address=wallet_address, wallet='phantom')
            user.username = f"phantom - {wallet_address}"
            user.save()

            user_currency, _ = UserCurrency.objects.get_or_create(user=user)
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def verify_signature(self, public_key: str, message: str, signature: list) -> bool:
        """Проверка подписи Phantom"""
        try:
            decoded_pubkey = b58decode(public_key)  # Конвертируем Base58 в байты (32 байта)
            verify_key = Pubkey(decoded_pubkey)

            message_bytes = message.encode()
            signature_bytes = bytes(signature)  # Преобразуем массив чисел в байты
            signature_obj = Signature(signature_bytes)
            
            return signature_obj.verify(verify_key, message_bytes)
        
        except BadSignatureError:
            return False
        except Exception as e:
            print(f"Signature verification error: {e}")
            return False
# ---------------------------------------- PHANTOM  ---------------------------------------- #

# ---------------------------------------- TRONLINK ---------------------------------------- #
class TronVerifySignatureAndLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: WSGIRequest):
        wallet_address = request.data.get("wallet_address")

        if not wallet_address:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        user, _ = User.objects.get_or_create(wallet_address=wallet_address, wallet='tron')
        user.username = f"tron - {wallet_address}"
        user.save()

        user_currency, _ = UserCurrency.objects.get_or_create(user=user)
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
# ---------------------------------------- TRONLINK ---------------------------------------- #

# ---------------------------------------- TONKEEPER ---------------------------------------- #

class TonkeeperVerifySignatureAndLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        wallet_address = request.data.get("wallet_address")

        if not wallet_address:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        user, _ = User.objects.get_or_create(wallet_address=wallet_address, wallet='tonkeeper')
        user.username = f"tonkeeper - {wallet_address}"
        user.save()

        user_currency, _ = UserCurrency.objects.get_or_create(user=user)
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
# ---------------------------------------- TONKEEPER ---------------------------------------- #


# ---------------------------------------- MAIN  ---------------------------------------- #
class StakingAPIView(APIView):
    authentication_classes = [JWTAuthentication] 
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        wallet_address = Web3.to_checksum_address(user.wallet_address)
        transaction_hash = request.data.get("th")

        if not transaction_hash:
            return Response({"error": "Не указан th"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tx = w3.eth.get_transaction(transaction_hash)

            tx_from = Web3.to_checksum_address(tx["from"])
            tx_to = Web3.to_checksum_address(tx["to"])
            contract_address = Web3.to_checksum_address(settings.STAKING_CONTRACT_ADDRESS)

            if tx_from != wallet_address:
                return Response({"error": "Транзакция не принадлежит пользователю"}, status=status.HTTP_400_BAD_REQUEST)
            
            if tx_to != contract_address:
                return Response({"error": "Транзакция не связана со стейкингом"}, status=status.HTTP_400_BAD_REQUEST)

            contract = w3.eth.contract(address=contract_address, abi=settings.STAKING_ABI)
            decoded_input = contract.decode_function_input(tx["input"])
            
            if decoded_input[0].fn_name != "stake":
                return Response({"error": "Транзакция не является стейкингом"}, status=status.HTTP_400_BAD_REQUEST)

            stake_amount = Web3.from_wei(decoded_input[1]["_amount"], "ether")

            receipt = w3.eth.get_transaction_receipt(transaction_hash)
            if receipt["status"] != 1:
                return Response({"error": "Транзакция неуспешна"}, status=status.HTTP_400_BAD_REQUEST)

            user_stake, created = Stake.objects.get_or_create(
                user=user,
                amount=str(stake_amount),
                start_time=datetime.now(),
                is_active=True
            )
            user.total_mzk = float(user.total_mzk) + float(stake_amount)
            user.save()

            if created:
                return Response({"success": "Стейкинг подтвержден", "amount": str(stake_amount)}, status=status.HTTP_201_CREATED)
            else:
                return Response({"success": "Транзакция уже сохранена"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request):
        user = request.user
        wallet_address = Web3.to_checksum_address(user.wallet_address)
        transaction_hash = request.data.get("th")

        if not transaction_hash:
            return Response({"error": "Не указан th"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tx = w3.eth.get_transaction(transaction_hash)
            tx_from = Web3.to_checksum_address(tx["from"])
            tx_to = Web3.to_checksum_address(tx["to"])
            contract_address = Web3.to_checksum_address(settings.STAKING_CONTRACT_ADDRESS)

            if tx_from != wallet_address:
                return Response({"error": "Транзакция не принадлежит пользователю"}, status=status.HTTP_400_BAD_REQUEST)
            
            if tx_to != contract_address:
                return Response({"error": "Транзакция не связана со стейкингом"}, status=status.HTTP_400_BAD_REQUEST)

            contract = w3.eth.contract(address=contract_address, abi=settings.STAKING_ABI)
            decoded_input = contract.decode_function_input(tx["input"])

            if decoded_input[0].fn_name != "unstake":
                return Response({"error": "Транзакция не является анстейкингом"}, status=status.HTTP_400_BAD_REQUEST)

            receipt = w3.eth.get_transaction_receipt(transaction_hash)
            if receipt["status"] != 1:
                return Response({"error": "Транзакция неуспешна"}, status=status.HTTP_400_BAD_REQUEST)

            user_stake = Stake.objects.filter(user=user, is_active=True).first()
            if user_stake:
                user_stake.is_active = False
                user_stake.end_time = datetime.now()
                user_stake.save()
                return Response({"success": "Стейк деактивирован"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Активный стейк не найден"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetTotalValues(APIView):
    authentication_classes = [JWTAuthentication] 
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request: WSGIRequest):
        user = request.user
        total_pic = user.total_pic
        total_mzk = user.total_mzk
        return Response({
            "total_pic": total_pic,
            "total_mzk": total_mzk
        }, status=status.HTTP_200_OK)
    

class HasActiveStakingAPIView(APIView):
    authentication_classes = [JWTAuthentication] 
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request: WSGIRequest):
        user = request.user
        user_stake = Stake.objects.filter(user=user).filter(is_active=True).first()
        if user_stake:
            return Response({
                "answer": True,
                "amount": user_stake.amount
            }, status=status.HTTP_200_OK)
        
        return Response({
            "answer": False
        }, status=status.HTTP_200_OK)
# ---------------------------------------- MAIN  ---------------------------------------- #
        