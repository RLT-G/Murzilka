from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission
from django.contrib.auth import get_user_model
from django.utils.timezone import now


class CustomUser(AbstractUser):
    email_verified = models.BooleanField(default=False)
    social_auth_provider = models.CharField(max_length=255, null=True, blank=True)
    social_auth_id = models.CharField(max_length=255, null=True, blank=True)

    metamask_wallet_address = models.CharField(max_length=42, unique=True, blank=True, null=True)
    metamask_nonce = models.CharField(max_length=255, blank=True, null=True)

    tonkeeper_address = models.CharField(max_length=64, unique=True, blank=True, null=True)

    tron_wallet_address = models.CharField(max_length=42, unique=True, blank=True, null=True)
    tron_nonce = models.CharField(max_length=255, blank=True, null=True)

    pic_balance = models.PositiveIntegerField(default=0)
    
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions_set',
        blank=True,
    )


User = get_user_model()


class Stake(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=20, decimal_places=8)  # Токены в стейкинге
    start_time = models.DateTimeField(auto_now_add=True)  # Дата начала стейкинга
    end_time = models.DateTimeField(null=True, blank=True)  # Время вывода токенов (если это произошло)
    is_active = models.BooleanField(default=True)  # Флаг активности

    def __str__(self):
        return f"{self.user.username} - {self.amount} tokens"
    

class UserCurrency(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="currency")
    balance = models.DecimalField("PIC", max_digits=20, decimal_places=10, default=0)  # Баланс PIC

    def __str__(self):
        return f"{self.user.username} balance: {self.balance} PIC"