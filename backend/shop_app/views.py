from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Product, Card, CardItem, Transaction
from .serializers import ProductSerializer, DetailedProductSerializer, CardItemSerializer, CardSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.conf import settings
import stripe
from django.http import JsonResponse
# from urllib.parse import urljoin
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
import paypalrestsdk
from decimal import Decimal

STRIPE_PUBLISHABLE_KEY = settings.STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY = settings.STRIPE_SECRET_KEY

paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,  # sandbox or live
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_SECRET})


@api_view(['GET'])
def products_view(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def product_detail_view(request, slug):
    try:
        product = Product.objects.get(slug=slug)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'},
                        status=status.HTTP_404_NOT_FOUND)

    serializer = DetailedProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Enforce authentication
def add_to_card_view(request):
    card_code = request.data.get('card')
    product_id = request.data.get('product_id')

    product = get_object_or_404(Product, id=product_id)
    if card_code is None:
        card = Card.objects.create()
    else:
        card = Card.objects.get(code=card_code)
    cardItem, created = CardItem.objects.get_or_create(
        card=card, product=product)
    card.refresh_from_db()
    serializer = CardSerializer(card)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def product_in_card_view(request):
    card_code = request.query_params.get('card_code')
    product_id = request.query_params.get('product_id')
    card = get_object_or_404(Card, code=card_code)
    product = get_object_or_404(Product, id=product_id)

    product_exists = CardItem.objects.filter(
        card=card, product=product).exists()

    return Response({'product_exists': product_exists},
                    status=status.HTTP_200_OK)


@api_view(['GET'])
def card_view(request):
    card_code = request.query_params.get('card_code')
    if not card_code:
        return Response({'error': 'Card code is required'},
                        status=status.HTTP_400_BAD_REQUEST)

    card = get_object_or_404(Card, code=card_code, paid=False)
    serializer = CardSerializer(card)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def update_quantity_view(request):
    card_item_id = request.data.get('item_id')
    quantity = int(request.data.get('quantity'))

    card_item = CardItem.objects.get(id=card_item_id)
    if quantity <= 0:
        card_item.delete()
        return Response({'message': 'Item deleted'}, status=status.HTTP_204_NO_CONTENT)
    else:
        card_item.quantity = quantity
        card_item.save()
        serializer = CardItemSerializer(card_item)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_cardItem_view(request, item_id):
    card_item = get_object_or_404(CardItem, id=item_id)
    card_item.delete()
    return Response({'message': 'Card item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


def _create_transaction_for_payment(request):
    # This function would handle the payment initiation logic
    # For now, we will just return a placeholder response
    card_code = request.data.get('card_code', None)

    if card_code is None:
        return Response({'error': 'Card code is required'}, status=status.HTTP_400_BAD_REQUEST)
    card = get_object_or_404(Card, code=card_code, paid=False)
    user = request.user
    tax = Decimal("4.00")
    amount = Decimal(sum([item.quantity * item.product.price for item in card.items.all()]))
    total_amount = amount + tax
    currency = 'cad'

    transaction = Transaction.objects.create(
        card=card,
        amount=amount,
        tax=tax,
        currency=currency,
        user=user,
        status='pending'
    )
    domain = request.build_absolute_uri('/')[:-1]

    return transaction, card, user, tax, amount, currency, total_amount, domain


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session_stripe(request):
    transaction, card, user, tax, amount, currency, total_amount, domain = _create_transaction_for_payment(request)

    line_items = [
        {
            'price_data': {
                'currency': currency,
                'product_data': {
                    'name': item.product.name,
                    'description': item.product.description,
                    'images': [request.build_absolute_uri(item.product.image.url)],
                },
                'unit_amount': int(item.product.price * 100)
            },
            'quantity': item.quantity,
        }
        for item in card.items.all()
    ]

    stripe.api_key = STRIPE_SECRET_KEY

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=line_items,
        mode='payment',
        success_url=f'{domain}/payment/check?status=success&transaction_ref={transaction.ref}',
        cancel_url=f'{domain}/payment/check?status=failed&transaction_ref={transaction.ref}',

        customer_email=user.email,

        metadata={
            'customer_name': user.get_full_name,
            'customer_id': user.id,
            'customer_name': f'{user.first_name} {user.last_name}',
            'customer_phone': user.phone,
            'customer_address': user.address,
        },
    )

    transaction.session_id = session.id
    transaction.card.user = user
    transaction.card.save()
    transaction.save()

    return JsonResponse({'id': session.id, 'publishable_key': STRIPE_PUBLISHABLE_KEY})


@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def stripe_webhook(request):
    FRONT_URL = "http://localhost:5173"
    status = request.query_params.get('status')
    transaction_ref = request.query_params.get('transaction_ref')

    transaction = get_object_or_404(Transaction, ref=transaction_ref)

    if status == 'success':
        transaction.status = 'paid'
        transaction.card.paid = True
        transaction.card.save()
        transaction.save()
        return redirect(f'{FRONT_URL}/payment-success')
    elif status == 'failed':
        transaction.status = 'unpaid'
        transaction.card.paid = True
        transaction.save()
        return redirect(f'{FRONT_URL}/payment-failed')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_paypal_payment(request):
    transaction, card, user, tax, amount, currency, total_amount, domain = _create_transaction_for_payment(request)

    # Merge all items into one list
    items = []
    total_price = 0
    for item in card.items.all():
        price = float(item.product.price)
        quantity = item.quantity
        total_price += price * quantity

        items.append({
            "name": item.product.name,
            "sku": "item",
            "price": str(price),
            "currency": currency,
            "quantity": quantity
        })

    # Only one transaction object
    transactions = [{
        "item_list": {
            "items": items
        },
        "amount": {
            "total": f"{total_price:.2f}",
            "currency": currency
        },
        "description": f"Payment for {len(items)} items"
    }]

    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": f"{domain}/payment/check?status=success&transaction_ref={transaction.ref}",
            "cancel_url": f"{domain}/payment/check?status=failed&transaction_ref={transaction.ref}",
        },
        "transactions": transactions
    })

    if payment.create():
        for link in payment.links:
            if link.rel == "approval_url":
                return Response({'approval_url': link.href}, status=status.HTTP_200_OK)
        return Response({'message': 'Payment created, but no approval URL found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'message': payment.error}, status=status.HTTP_400_BAD_REQUEST)

