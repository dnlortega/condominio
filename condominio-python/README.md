# Sistema de Condomínio - Django

Sistema de gerenciamento de condomínio desenvolvido em Django com PostgreSQL.

## 🚀 Funcionalidades

- ✅ Painel administrativo completo
- ✅ Cadastro de categorias de serviços
- ✅ Cadastro de prestadores de serviços (Concessionárias)
- ✅ Sistema de autenticação
- ✅ Interface responsiva
- ✅ Integração com PostgreSQL

## 📋 Pré-requisitos

- Python 3.10+
- PostgreSQL
- pip

## 🔧 Instalação

1. **Criar ambiente virtual:**
```bash
python -m venv venv
```

2. **Ativar ambiente virtual:**

Windows:
```bash
venv\Scripts\activate
```

Linux/Mac:
```bash
source venv/bin/activate
```

3. **Instalar dependências:**
```bash
pip install -r requirements.txt
```

4. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

5. **Executar migrações:**
```bash
python manage.py migrate
```

6. **Criar superusuário:**
```bash
python manage.py createsuperuser
```

7. **Executar servidor:**
```bash
python manage.py runserver
```

Acesse: http://localhost:8000

## 🎯 Estrutura do Projeto

```
condominio-python/
├── condominio/          # Configurações do projeto
├── servicos/            # App de serviços
├── manage.py
├── requirements.txt
└── README.md
```

## 🔐 Admin Panel

Acesse o painel administrativo em: http://localhost:8000/admin

## 📦 Modelos

### Category
- Nome
- Ícone
- Data de criação/atualização

### ServiceProvider
- Nome
- Contato
- WhatsApp
- Categoria
- Data de criação/atualização

## 🛠️ Tecnologias

- Django 5.0
- PostgreSQL
- Django REST Framework
- WhiteNoise (arquivos estáticos)

## 📝 Licença

MIT
