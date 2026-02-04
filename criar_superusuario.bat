@echo off
echo ========================================
echo   CRIAR SUPERUSUARIO - DJANGO
echo ========================================
echo.

cd condominio-python
call venv\Scripts\activate

echo Criando superusuario...
echo.
echo Sugestoes:
echo   Usuario: admin
echo   Email: admin@condominio.com
echo   Senha: admin123
echo.

python manage.py createsuperuser

echo.
echo ========================================
echo   SUPERUSUARIO CRIADO COM SUCESSO!
echo ========================================
echo.
echo Acesse: http://localhost:8000/admin
echo.
pause
