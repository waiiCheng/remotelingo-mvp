#!/bin/bash

echo "========================================"
echo "  RemoteLingo - Frontend Server"
echo "========================================"
echo ""

cd frontend

echo "Installing Node.js dependencies..."
npm install

echo ""
echo "Starting Next.js development server..."
echo "Frontend will be available at: http://localhost:3000"
echo ""

npm run dev
