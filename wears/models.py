from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class MaleWear(models.Model):
    name = models.CharField(max_length=120)
    priceM = models.DecimalField(max_digits=4, decimal_places=2)
    priceL = models.DecimalField(max_digits=4, decimal_places=2)
    mImage = models.URLField()


class FemaleWear(models.Model):
    name = models.CharField(max_length=120)
    priceM = models.DecimalField(max_digits=4, decimal_places=2)
    priceL = models.DecimalField(max_digits=4, decimal_places=2)
    wImage = models.URLField()


class Footwear(models.Model):
    name = models.CharField(max_length=120)
    priceM = models.DecimalField(max_digits=4, decimal_places=2)
    priceL = models.DecimalField(max_digits=4, decimal_places=2)
    fImage = models.URLField(null=True)


class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    number = models.CharField(max_length=60)
    bill = models.DecimalField(max_digits=4, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    note = models.TextField(blank=True, null=True)


class Item(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=4, decimal_places=2)
    size = models.CharField(max_length=60)

