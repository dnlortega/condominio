from django.contrib import admin
from .models import Category, ServiceProvider


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin para Categorias"""
    list_display = ('name', 'icon', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    readonly_fields = ('id', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'icon')
        }),
        ('Metadados', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ServiceProvider)
class ServiceProviderAdmin(admin.ModelAdmin):
    """Admin para Prestadores de Serviços"""
    list_display = ('name', 'category', 'contact', 'has_whatsapp', 'created_at')
    list_filter = ('category', 'has_whatsapp', 'created_at')
    search_fields = ('name', 'contact')
    readonly_fields = ('id', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'category')
        }),
        ('Contato', {
            'fields': ('contact', 'has_whatsapp')
        }),
        ('Metadados', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Otimiza queries com select_related"""
        qs = super().get_queryset(request)
        return qs.select_related('category')

