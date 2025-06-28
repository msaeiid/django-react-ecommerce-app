from django.contrib import admin
from .models import Product, Card, CardItem, Transaction


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'category')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)


class CardItemAdmin(admin.TabularInline):
    model = CardItem
    extra = 1


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ('code', 'created_at', 'updated_at', 'paid', 'user')
    inlines = [CardItemAdmin]  # Correct usage


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('ref', 'session_id', 'card', 'amount', 'tax', 'currency', 'status', 'user', 'created_at',
                    'updated_at')
