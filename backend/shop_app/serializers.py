from rest_framework import serializers
from .models import Product, Card, CardItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'image', 'price', 'category']
        read_only_fields = ['slug']  # slug is auto-generated, so it should be read-only


class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'image',
                  'description', 'price', 'category', 'similar_products']
        read_only_fields = ['slug']

    def get_similar_products(self, obj):
        products = Product.objects.filter(category=obj.category) \
            .exclude(id=obj.id)
        serializers = ProductSerializer(products, many=True)
        return serializers.data


class CardItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CardItem
        fields = ['id', 'card', 'quantity', 'total_price', 'product']
        read_only_fields = ['id', 'card', 'total_price']

    def get_total_price(self, obj):
        return obj.product.price * obj.quantity


class CardSerializer(serializers.ModelSerializer):
    number_of_items = serializers.SerializerMethodField()
    items = CardItemSerializer(many=True, read_only=True)
    sum_total = serializers.SerializerMethodField()
    sum_quantity = serializers.SerializerMethodField()

    class Meta:
        model = Card
        fields = ['id', 'code', 'created_at', 'updated_at',
                  'number_of_items', 'sum_total', 'sum_quantity', 'items']
        read_only_fields = ['created_at', 'updated_at',
                            'number_of_items', 'sum_total', 'sum_quantity', 'items']

    def get_number_of_items(self, obj):
        return obj.items.count() if obj.items else 0

    def get_sum_total(self, obj):
        return sum(item.product.price * item.quantity for item in obj.items.all())

    def get_sum_quantity(self, obj):
        return sum(item.quantity for item in obj.items.all())
