# 🚀 RemoteLingo - Quick Start Guide

## ⚡ Fast Setup (5 Minutes)

### Windows Users

1. **Double-click to run**:
   ```
   start-all.bat
   ```
   This will open 2 terminal windows (backend + frontend)

2. **Open browser**:
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:8000/docs

### Mac/Linux Users

1. **Make scripts executable** (one-time):
   ```bash
   chmod +x start-backend.sh start-frontend.sh
   ```

2. **Run in separate terminals**:

   **Terminal 1 (Backend)**:
   ```bash
   ./start-backend.sh
   ```

   **Terminal 2 (Frontend)**:
   ```bash
   ./start-frontend.sh
   ```

3. **Open browser**:
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:8000/docs

---

## 🎯 What You'll See

### Homepage Features
- ✅ Real-time job listings from API
- ✅ Language filter pills (Chinese, Korean, Japanese, etc.)
- ✅ Job type filters (Full-time, Contract, etc.)
- ✅ AI verification badges
- ✅ Live crawler status indicator
- ✅ Loading skeletons while fetching data

### Test the Filters
1. Click on a language pill (e.g., 🇨🇳 Chinese)
2. Jobs will automatically filter
3. Try selecting different job types
4. Watch the counter update in real-time

---

## 📊 API Testing

### Test Endpoints Manually

```bash
# Health check
curl http://localhost:8000/health

# Get all jobs
curl http://localhost:8000/jobs

# Filter by Chinese language
curl http://localhost:8000/jobs?lang=zh

# Filter by job type
curl http://localhost:8000/jobs?job_type=Full-time

# Get specific job
curl http://localhost:8000/jobs/1
```

### Interactive API Docs
Visit: http://localhost:8000/docs

You can test all endpoints directly in the browser!

---

## 🔧 Manual Setup (If Scripts Don't Work)

### Backend Setup

```bash
# 1. Navigate to API folder
cd api

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start server
python main.py
```

### Frontend Setup

```bash
# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

---

## ✅ Verification Checklist

After starting both servers:

- [ ] Backend running at http://localhost:8000
- [ ] Frontend running at http://localhost:3000
- [ ] Jobs loading on homepage (not showing error)
- [ ] Crawler status showing "Active" in top bar
- [ ] Language filters working
- [ ] Job type filters working
- [ ] AI verified badges showing

---

## 🐛 Common Issues

### Issue: "pip not found"
**Solution**: Install Python from https://python.org

### Issue: "npm not found"
**Solution**: Install Node.js from https://nodejs.org

### Issue: "Port 8000 already in use"
**Solution** (Windows):
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: Frontend shows connection error
**Solution**: Make sure backend is running first

### Issue: Jobs not loading
**Solution**:
1. Check browser console (F12)
2. Verify backend is running
3. Check `frontend/.env.local` has correct API URL

---

## 📁 Project Structure Overview

```
RemoteLingo/
├── api/              → FastAPI backend (Python)
│   ├── main.py      → API server
│   ├── models/      → Data models
│   └── services/    → Scraper + Database logic
│
└── frontend/         → Next.js frontend (TypeScript)
    ├── app/         → Pages and layouts
    ├── components/  → React components
    └── lib/         → API client
```

---

## 🎨 Customization

### Change API Port

Edit `api/main.py`:
```python
uvicorn.run("main:app", port=9000)  # Change 8000 to 9000
```

Then update `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:9000
```

### Add More Languages

Edit `frontend/app/page.tsx`:
```typescript
const LANGUAGES = [
  // ... existing languages
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];
```

### Modify Mock Data

Edit `api/services/database.py` → `_init_mock_data()`

---

## 🚀 Next Steps

1. **Explore the API docs**: http://localhost:8000/docs
2. **Modify the frontend**: Edit `frontend/app/page.tsx`
3. **Add more jobs**: Edit `api/services/database.py`
4. **Integrate real AI**: Add Claude/OpenAI API keys
5. **Deploy to production**: See README.md deployment section

---

## 📚 Full Documentation

For complete documentation, see: [README.md](README.md)

---

**Need help?** Check the main README.md or open an issue.

**Happy building! 🎉**
