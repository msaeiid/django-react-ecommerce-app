from django.urls import path
from . import views

urlpatterns = [
    path('', views.products_view, name='products'),
    path('<slug:slug>', views.product_detail_view, name='products_detail'),
    path('add_product/', views.add_to_card_view, name='add_to_card'),
    path('product_in_card/', views.product_in_card_view, name='product_in_card'),
    path('card/', views.card_view, name='card_view'),
    path('update_quantity/', views.update_quantity_view, name='update_quantity'),
    path('delete_product/<int:item_id>', views.delete_cardItem_view, name='delete_cardItem_view'),
    
]
