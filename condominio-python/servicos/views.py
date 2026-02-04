from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Category, ServiceProvider


class CategoryListView(ListView):
    """Lista todas as categorias"""
    model = Category
    template_name = 'servicos/category_list.html'
    context_object_name = 'categories'
    
    def get_queryset(self):
        return Category.objects.prefetch_related('providers').all()


class ServiceProviderListView(ListView):
    """Lista todos os prestadores de serviços"""
    model = ServiceProvider
    template_name = 'servicos/provider_list.html'
    context_object_name = 'providers'
    
    def get_queryset(self):
        queryset = ServiceProvider.objects.select_related('category').all()
        
        # Filtro por categoria
        category_id = self.request.GET.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context


def home(request):
    """Página inicial"""
    categories = Category.objects.all()[:6]
    providers_count = ServiceProvider.objects.count()
    categories_count = Category.objects.count()
    
    context = {
        'categories': categories,
        'providers_count': providers_count,
        'categories_count': categories_count,
    }
    return render(request, 'servicos/home.html', context)
