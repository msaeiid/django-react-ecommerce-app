from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, CreditCard

class CreditCardInline(admin.TabularInline):  # or admin.StackedInline
    model = CreditCard
    extra = 1

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Information', {'fields': ('city', 'state', 'phone', 'address')}),
    )
    inlines = [CreditCardInline]

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(CreditCard)