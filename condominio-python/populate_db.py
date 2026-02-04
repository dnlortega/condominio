"""
Script para popular o banco de dados com dados de exemplo
Execute com: python manage.py shell < populate_db.py
"""

from servicos.models import Category, ServiceProvider

# Limpar dados existentes (opcional)
print("🗑️  Limpando dados existentes...")
ServiceProvider.objects.all().delete()
Category.objects.all().delete()

# Criar Categorias
print("📁 Criando categorias...")
categories_data = [
    {'name': 'Concessionárias', 'icon': '⚡'},
    {'name': 'Manutenção', 'icon': '🔧'},
    {'name': 'Limpeza', 'icon': '🧹'},
    {'name': 'Segurança', 'icon': '🛡️'},
    {'name': 'Jardinagem', 'icon': '🌿'},
    {'name': 'Portaria', 'icon': '🚪'},
]

categories = {}
for cat_data in categories_data:
    category = Category.objects.create(**cat_data)
    categories[cat_data['name']] = category
    print(f"  ✅ {cat_data['name']}")

# Criar Prestadores de Serviços
print("\n👥 Criando prestadores de serviços...")
providers_data = [
    # Concessionárias
    {'name': 'CEMIG - Companhia Energética', 'contact': '(31) 3506-5000', 'has_whatsapp': False, 'category': categories['Concessionárias']},
    {'name': 'COPASA - Água e Esgoto', 'contact': '(31) 3250-0115', 'has_whatsapp': False, 'category': categories['Concessionárias']},
    {'name': 'Claro TV', 'contact': '(31) 99999-1111', 'has_whatsapp': True, 'category': categories['Concessionárias']},
    
    # Manutenção
    {'name': 'Manutenção Predial Silva', 'contact': '(31) 98888-2222', 'has_whatsapp': True, 'category': categories['Manutenção']},
    {'name': 'Elétrica Souza', 'contact': '(31) 97777-3333', 'has_whatsapp': True, 'category': categories['Manutenção']},
    {'name': 'Hidráulica Costa', 'contact': '(31) 96666-4444', 'has_whatsapp': True, 'category': categories['Manutenção']},
    
    # Limpeza
    {'name': 'Limpeza Total Ltda', 'contact': '(31) 95555-5555', 'has_whatsapp': True, 'category': categories['Limpeza']},
    {'name': 'Clean Service', 'contact': '(31) 94444-6666', 'has_whatsapp': True, 'category': categories['Limpeza']},
    
    # Segurança
    {'name': 'Segurança Máxima', 'contact': '(31) 93333-7777', 'has_whatsapp': True, 'category': categories['Segurança']},
    {'name': 'Vigilância 24h', 'contact': '(31) 92222-8888', 'has_whatsapp': True, 'category': categories['Segurança']},
    
    # Jardinagem
    {'name': 'Jardins & Cia', 'contact': '(31) 91111-9999', 'has_whatsapp': True, 'category': categories['Jardinagem']},
    {'name': 'Verde Vida Paisagismo', 'contact': '(31) 90000-1111', 'has_whatsapp': True, 'category': categories['Jardinagem']},
    
    # Portaria
    {'name': 'Portaria Profissional', 'contact': '(31) 98765-4321', 'has_whatsapp': True, 'category': categories['Portaria']},
]

for provider_data in providers_data:
    provider = ServiceProvider.objects.create(**provider_data)
    print(f"  ✅ {provider.name} - {provider.category.name}")

print(f"\n✨ Banco de dados populado com sucesso!")
print(f"📊 Total: {Category.objects.count()} categorias e {ServiceProvider.objects.count()} prestadores")
