@echo off
echo ========================================
echo   RemoteLingo - Backend Server
echo ========================================
echo.

cd api

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Starting FastAPI server...
echo API will be available at: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.

python main.py
