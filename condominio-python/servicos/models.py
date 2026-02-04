from django.db import models
from django.utils import timezone
import uuid


class Category(models.Model):
    """Modelo para categorias de serviços"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, unique=True, verbose_name='Nome')
    icon = models.CharField(max_length=100, blank=True, null=True, verbose_name='Ícone', 
                           help_text='Nome do ícone lucide-react')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['name']

    def __str__(self):
        return self.name


class ServiceProvider(models.Model):
    """Modelo para prestadores de serviços (Concessionárias)"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, verbose_name='Nome')
    contact = models.CharField(max_length=200, verbose_name='Contato')
    has_whatsapp = models.BooleanField(default=True, verbose_name='Tem WhatsApp')
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='providers',
        verbose_name='Categoria'
    )
    created_at = models.DateTimeField(default=timezone.now, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')

    class Meta:
        verbose_name = 'Prestador de Serviço'
        verbose_name_plural = 'Prestadores de Serviços'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.category.name}"
