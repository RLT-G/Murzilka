from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    email_verified = models.BooleanField(default=False)
    social_auth_provider = models.CharField(max_length=255, null=True, blank=True)
    social_auth_id = models.CharField(max_length=255, null=True, blank=True)

    metamask_wallet_address = models.CharField(max_length=42, unique=True, blank=True, null=True)
    metamask_nonce = models.CharField(max_length=255, blank=True, null=True)

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