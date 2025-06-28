from django.db import models
from django.utils.text import slugify
from django.conf import settings
import random
import string
import uuid


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('electronics', 'Electronics'),
        ('clothing', 'Clothing'),
        ('gorceties', 'Groceries'),
    ]
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, null=True)
    image = models.ImageField(upload_to='products/')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Card(models.Model):
    def generate_card_code():
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=11))

    code = models.CharField(max_length=11,
                            unique=True,
                            default=generate_card_code)

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True, null=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True,
                                      null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True,
                                      null=True, blank=True)

    def __str__(self):
        return self.code


class CardItem(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE,
                             related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in card {self.card.code}"


class Transaction(models.Model):
    def genetate_random_code():
        return str(uuid.uuid4())

    ref = models.CharField(max_length=255, unique=True, default=genetate_random_code)
    session_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    currency = models.CharField(max_length=10, default='USD')
    status = models.CharField(max_length=20,
                              default='new',
                              choices=[('unpaid', 'unpaid'),
                                       ('paid', 'paid'),
                                       ('new', 'new')])
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.ref
