from django.contrib import admin
from .models import CustomUser, Stake, UserCurrency


# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    fields = ('email_verified', 'social_auth_provider', 'social_auth_id', 'wallet_address', 'wallet', 'nonce', 'total_mzk', 'total_pic')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Stake)
admin.site.register(UserCurrency)
