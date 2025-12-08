#!/bin/bash

echo "========================================"
echo "  RemoteLingo - Supabase Version"
echo "========================================"
echo ""

cd frontend

echo "Checking environment variables..."
if [ ! -f .env.local ]; then
    echo "ERROR: .env.local not found!"
    echo ""
    echo "Please create frontend/.env.local with your Supabase credentials:"
    echo "NEXT_PUBLIC_SUPABASE_URL=your-url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key"
    echo ""
    echo "See SUPABASE_SETUP.md for instructions."
    exit 1
fi

echo "Installing dependencies..."
npm install

echo ""
echo "Starting Next.js application..."
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "Note: Make sure you have set up Supabase first!"
echo "See SUPABASE_SETUP.md for instructions."
echo ""

npm run dev
