from rest_framework import serializers
from django.contrib.auth import get_user_model
from shop_app.models import CardItem
from shop_app.serializers import ProductSerializer


class CardItemListSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    order_id = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField()

    class Meta:
        model = CardItem
        fields = ['id', 'product', 'quantity', 'order_id', 'order_date']

    def get_order_id(self, obj):
        return obj.card.code

    def get_order_date(self, obj):
        return obj.card.updated_at


class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'full_name', 'city',
                  'state', 'address', 'phone', 'last_login', 'items']
        read_only_fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'full_name',
                            'city', 'state', 'address', 'phone', 'last_login', 'items']

    def get_full_name(self, obj):
        """
        Returns the full name of the user by combining first and last names.
        """
        return f"{obj.first_name} {obj.last_name}".strip() if obj.first_name or obj.last_name else None

    def get_items(self, obj):
        cardItems = CardItem.objects.filter(card__user=obj, card__paid=True)
        serializer = CardItemListSerializer(cardItems, many=True)
        return serializer.data
