from django.urls import path
from . import views

app_name = 'wears'

urlpatterns = [
    path('malewears', views.malewears, name='malewears'),
    path('femalewears', views.femalewears, name='femalewears'),
    path('footwears', views.footwears, name='footwears'),
    path('signup', views.signup, name='signup'),
    path('login', views.userLogin, name='login'),
    path('logout', views.userLogout, name='logout'),
    path('order', views.order, name='order'),
    path('success', views.success, name='success'),

]
