from django.shortcuts import render, redirect
from .models import MaleWear, FemaleWear, Footwear, Order, Item
from .forms import NewUserForm
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import random
import json


# Create your views here.
def randomOrderNumber(length):
    sample = 'ABCDEFGH0123456789'
    numberO = ''.join((random.choice(sample) for i in range(length)))
    return numberO


def index(request):
    request.session.set_expiry(0)
    ctx = {'active_link': 'index'}
    return render(request, 'wears/index.html', ctx)


def malewears(request):
    request.session.set_expiry(0)
    malewears = MaleWear.objects.all()
    ctx = {'malewears': malewears, 'active_link': 'male'}
    print(malewears)
    return render(request, 'wears/malewears.html', ctx)


def femalewears(request):
    request.session.set_expiry(0)
    femalewears = FemaleWear.objects.all()
    ctx = {'femalewears': femalewears, 'active_link': 'female'}
    print(femalewears)
    return render(request, 'wears/femalewears.html', ctx)


def footwears(request):
    request.session.set_expiry(0)
    footwears = Footwear.objects.all()
    ctx = {'footwears': footwears, 'active_link': 'footwear'}
    print(footwears)
    return render(request, 'wears/footwears.html', ctx)


@csrf_exempt
def order(request):
    request.session.set_expiry(0)
    if request.is_ajax():
        request.session['note'] = request.POST.get('note')
        request.session['order'] = request.POST.get('orders')
        orders = json.loads(request.session['order'])
        request.session['bill'] = request.POST.get('bill')
        randomNum = randomOrderNumber(6)

        while Order.objects.filter(number=randomNum).count() > 0:
            randomNum = randomOrderNumber(6)
        
        if request.user.is_authenticated:
            order = Order(customer=request.user, 
                            number=randomOrderNumber(6), 
                            bill=float(request.session['bill']),
                            note=request.session['note'])
            order.save()
            request.session['orderNum'] = order.number
            for article in orders:
                item = Item(
                    order = order,
                    name = article[0],
                    price = article[2],
                    size = article[1],
                )
                item.save()

    ctx = {'active_link': 'order'}
    return render(request, 'wears/order.html', ctx)


def success(request):
    orderNum = request.session['orderNum']
    bill = request.session['bill']
    items = Item.objects.filter(order__number=orderNum)
    ctx = {'orderNum':orderNum, 'bill':bill, 'items':items}
    return render(request, 'wears/success.html', ctx)



def signup(request):
    ctx = {}
    if request.POST:
        form = NewUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
        else:
            ctx['form'] = form
    else:
        form = NewUserForm()
        ctx['form'] = form
    return render(request, 'wears/signup.html', ctx)


def userLogin(request):
    if request.POST:
        username = request.POST.get('username')
        pwd = request.POST.get('password')
        user = authenticate(request, username=username, password=pwd)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.info(request, 'username and/or password are incorrect')
    ctx = {'active_link': 'login'}
    return render(request, 'wears/login.html', ctx)


def userLogout(request):
    logout(request)
    return redirect('index')
