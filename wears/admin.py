from django.contrib import admin
from .models import MaleWear, FemaleWear, Footwear, Order, Item

# Register your models here.
class MaleWearAdmin(admin.ModelAdmin):
    list_display = ('name', 'priceM', 'priceL')

admin.site.register(MaleWear, MaleWearAdmin)

class FemaleWearAdmin(admin.ModelAdmin):
    list_display = ('name', 'priceM', 'priceL')

admin.site.register(FemaleWear, FemaleWearAdmin)

class FootwearAdmin(admin.ModelAdmin):
    list_display = ('name', 'priceM', 'priceL')

admin.site.register(Footwear, FootwearAdmin)

admin.site.register(Order)

admin.site.register(Item)

