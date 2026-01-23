# Sekaidaisuki Integration - Current Status & Solution

## ✅ Answers to Your Questions:

### 1. **Do we currently have a public JSON endpoint or RSS feed?**
**Answer**: ⚠️ **PARTIAL** - We have a FastAPI backend with `/jobs` endpoint, but it's currently NOT publicly accessible in production.

**Current Situation**:
- **Backend API**: `http://localhost:8000/jobs` (FastAPI - Python)
- **Status**: Development only, not deployed
- **Frontend**: Uses static `jobsData.ts` file (hardcoded jobs)

**What we need**: Create a **Next.js API route** for public access at `/api/jobs.json`

---

### 2. **Sample JSON Object** (ONE job listing)

```json
{
  "id": 301,
  "title": "Japanese Account Manager - FX Trading Giant (Via RemoteLingo Partnership)",
  "company": "Exness (World's Largest Retail Broker)",
  "languages": ["Japanese", "English"],
  "level": "Mid Level",
  "salary_min": 30000,
  "salary_max": 54000,
  "currency": "EUR",
  "location": "Limassol, Cyprus (Full Relocation Package)",
  "type": "Full-time",
  "tags": ["Japanese", "Financial Services", "Visa Sponsored", "Company Car", "High Earner"],
  "posted_at": "12h ago",
  "featured": true,
  "ai_verified": true,
  "status": "priority",
  "source": "Exness Careers",
  "match_score": 99,
  "summary": "Join the world's #1 retail forex broker (4,000万+ daily trades). Full package: Company car, private medical insurance, children's school fees covered, gym membership. Native Japanese required. 月給€2,500-€4,500 + 会社車 + 医療保険完備。",
  "apply_url": "https://www.jobsinforex.com/jobs/forex-jobs-in-Limassol/"
}
```

---

### 3. **Do we have separate fields?**

✅ **YES** - All required fields exist:

| Field | Current Field Name | Type | Notes |
|-------|-------------------|------|-------|
| **Location** | `location` | `string` | Includes country/city (e.g., "Limassol, Cyprus") |
| **Salary** | `salary_min`, `salary_max`, `currency` | `number`, `string` | Separate min/max + EUR/USD |
| **Job Description** | `summary` | `string` (Text) | Plain text, not HTML |
| **Apply URL** | `apply_url` | `string` | Direct application link |

**Additional useful fields**:
- `languages`: Array of required languages
- `tags`: Job categories/skills
- `type`: Full-time/Contract/etc.
- `ai_verified`: Quality indicator
- `match_score`: Relevance score (0-100)

---

## 🛠️ **Solution: Create Public JSON Feed**

I will now create:

### Option A: Next.js API Route (Recommended)
**Endpoint**: `https://your-domain.vercel.app/api/jobs.json`

**Benefits**:
- ✅ Publicly accessible
- ✅ Automatically deployed with Vercel
- ✅ No additional backend server needed
- ✅ Can filter jobs (e.g., Japanese-only jobs)

### Option B: Static JSON Export
**File**: `/public/feed/jobs.json`

**Benefits**:
- ✅ Ultra-fast (static file)
- ✅ CDN-cached
- ✅ Simple to implement

---

## 📋 **Recommended Schema for Sekaidaisuki**

Based on typical Japanese job aggregators, I recommend this simplified format:

```json
{
  "meta": {
    "total_jobs": 150,
    "last_updated": "2026-01-23T10:30:00Z",
    "feed_url": "https://remotelingo.com/api/jobs.json"
  },
  "jobs": [
    {
      "id": 301,
      "title": "Japanese Account Manager - FX Trading",
      "company": "Exness",
      "location": {
        "country": "Cyprus",
        "city": "Limassol",
        "remote": false,
        "relocation_support": true
      },
      "salary": {
        "min": 30000,
        "max": 54000,
        "currency": "EUR",
        "period": "annual"
      },
      "employment_type": "Full-time",
      "languages": [
        {"code": "ja", "name": "Japanese", "level": "native"},
        {"code": "en", "name": "English", "level": "business"}
      ],
      "description": "Join the world's #1 retail forex broker...",
      "apply_url": "https://www.jobsinforex.com/jobs/forex-jobs-in-Limassol/",
      "posted_date": "2026-01-22",
      "expires_date": "2026-02-22",
      "tags": ["Financial Services", "Visa Sponsored", "Relocation"],
      "benefits": ["Company Car", "Medical Insurance", "Relocation Package"]
    }
  ]
}
```

---

## 🚀 **Next Steps**

Would you like me to:

1. ✅ **Create the Next.js API route** (`/api/jobs.json`) - RECOMMENDED
2. ✅ **Generate a static JSON file** (`/public/feed/jobs.json`)
3. ✅ **Create both + a filtered Japanese-only feed** (`/api/jobs/japanese.json`)

Please confirm which option you prefer, and I'll implement it immediately!

---

## 📝 **Additional Notes**

- **Job Count**: Currently ~150+ jobs in database (multilingual)
- **Japanese-specific jobs**: ~40+ positions
- **Update Frequency**: Static data (manual updates via Git push)
- **Future Enhancement**: Can connect to Supabase for real-time updates

Let me know how you'd like to proceed! 🎯
