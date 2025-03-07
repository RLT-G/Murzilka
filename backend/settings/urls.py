from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
# from api.views import (
#     GoogleLogin,
#     FacebookLogin
# )


urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Api
    path('api/', include('api.urls')),

    # Facebook & Google
    # path('auth/', include('rest_framework_social_oauth2.urls')),
    # path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    # path('auth/facebook/', FacebookLogin.as_view(), name='facebook_login'),


    path('auth/', include('social_django.urls', namespace='social')),


    # OpenAPI схема
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # Swagger UI
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # Redoc UI
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
