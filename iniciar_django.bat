@echo off
echo ========================================
echo   INICIAR SERVIDOR DJANGO
echo ========================================
echo.

cd condominio-python
call venv\Scripts\activate

echo Iniciando servidor Django...
echo.
echo Acesse:
echo   - Site: http://localhost:8000
echo   - Admin: http://localhost:8000/admin
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

python manage.py runserver

pause
