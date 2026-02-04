# Sistema de Condomínio - Guia de Início Rápido

## 🚀 Como executar o sistema

### 1. Ativar o ambiente virtual
```bash
.\venv\Scripts\activate
```

### 2. Criar superusuário (admin)
```bash
python manage.py createsuperuser
```
- **Usuário:** admin
- **Email:** admin@condominio.com
- **Senha:** admin123

### 3. Popular banco de dados (opcional)
```bash
python manage.py shell < populate_db.py
```

### 4. Executar o servidor
```bash
python manage.py runserver
```

### 5. Acessar o sistema
- **Site:** http://localhost:8000
- **Admin:** http://localhost:8000/admin

## 📁 Estrutura do Projeto

```
condominio-python/
├── condominio/          # Configurações do Django
│   ├── settings.py      # Configurações principais
│   ├── urls.py          # URLs principais
│   └── wsgi.py
├── servicos/            # App de serviços
│   ├── models.py        # Modelos (Category, ServiceProvider)
│   ├── views.py         # Views
│   ├── admin.py         # Configuração do admin
│   ├── urls.py          # URLs do app
│   └── templates/       # Templates HTML
├── manage.py
├── requirements.txt
└── .env                 # Variáveis de ambiente
```

## 🎯 Funcionalidades

- ✅ Cadastro de Categorias
- ✅ Cadastro de Prestadores de Serviços
- ✅ Painel Admin Completo
- ✅ Filtros por Categoria
- ✅ Integração WhatsApp
- ✅ Interface Responsiva

## 🔧 Comandos Úteis

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Executar servidor
python manage.py runserver

# Shell interativo
python manage.py shell
```
