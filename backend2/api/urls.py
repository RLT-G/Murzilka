
from django.urls import path
from api import views


urlpatterns = [
    path('check_api/', view=views.CheckApiAPIView.as_view(), name="check_api"),
    path('register/', view=views.RegisterAPIView.as_view(), name="register"),
    path('token/', view=views.CustomTokenObtainPairView.as_view(), name='token'),
    path('token_refresh/', view=views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('google/get_url/', view=views.GetGoogleLoginURLAPIView.as_view(), name="google_url"),
    path('google/login/', view=views.GoogleLoginAPIView.as_view(), name="google_login"),

    path('facebook/get_url/', view=views.GetFacebookLoginURLAPIView.as_view(), name="facebook_url"),
    path('facebook/login/', view=views.FacebookLoginAPIView.as_view(), name="facebook_login"),

    path('metamask/nonce_generation/', view=views.MetamaskNonceGenerationAPIView.as_view(), name='metamask_nonce_generation'),
    path('metamask/verify_signature_and_login/', view=views.MetamaskVerifySignatureAndLoginAPIView.as_view(), name='metamask_verify_and_login'),
    path('metamask/get_balance/', view=views.MetamaskBalanceAPIView.as_view(), name='metamask_balance'),

    path('tonkeeper/challange/', view=views.GetTonkeeperChallangeAPIView.as_view(), name='tonkeeper_challange'),
    path('tonkeeper/verify_signature_and_login/', view=views.VerifyTonkeeperSignatureAPIView.as_view(), name='tonkeeper_verify_and_login'),
    
    path('tron/login/', view=views.TronLoginAPIView.as_view()),
]
