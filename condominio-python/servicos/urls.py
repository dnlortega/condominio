from django.urls import path
from . import views

app_name = 'servicos'

urlpatterns = [
    path('', views.home, name='home'),
    path('categorias/', views.CategoryListView.as_view(), name='category_list'),
    path('prestadores/', views.ServiceProviderListView.as_view(), name='provider_list'),
]
