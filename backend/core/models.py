from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.username


class CreditCard(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='credit_cards')
    type = models.CharField(max_length=40)
    number = models.CharField(max_length=16)
    expire_month = models.CharField(max_length=2)
    expire_year = models.CharField(max_length=4)
    cvv2 = models.CharField(max_length=3)
    is_default=models.BooleanField(default=False)

    def __str__(self):
        return self.number
