# 📊 RemoteLingo Google Sheets Template

## Quick Setup Steps

1. **Create a new Google Sheet**
2. **Copy the header row below** (Column names)
3. **Fill in your job data** following the format
4. **Publish to CSV**: File → Share → Publish to web → Select `.csv` format
5. **Copy the CSV URL** and update it in `app/page.tsx` line 202

---

## 📋 Column Structure (20 columns total)

**IMPORTANT:** Column A (index 0) can be used for internal ID/notes - it's skipped by the parser.

| Column | Field Name      | Type     | Example                                    | Required | Notes                                      |
|--------|-----------------|----------|-----------------------------------------------|----------|--------------------------------------------|
| A      | (Internal ID)   | Number   | 1                                             | No       | Skipped by parser, use for your reference  |
| B      | title           | Text     | Senior AI Engineer (LLM)                      | Yes      | Job title                                  |
| C      | company         | Text     | ByteDance                                     | Yes      | Company name                               |
| D      | logo            | Text     | BD                                            | No       | Logo initials (2-3 chars)                  |
| E      | color           | Text     | bg-teal-500                                   | No       | Tailwind CSS background color class        |
| F      | languages       | Text     | Chinese (Mandarin)\|English                   | Yes      | Pipe-separated (`\|`)                      |
| G      | level           | Text     | Native                                        | No       | Language proficiency level                 |
| H      | salary_min      | Number   | 80000                                         | No       | Minimum salary (numbers only)              |
| I      | salary_max      | Number   | 140000                                        | No       | Maximum salary (numbers only)              |
| J      | currency        | Text     | EUR                                           | No       | EUR or USD                                 |
| K      | location        | Text     | Remote (EU/UK)                                | Yes      | Job location                               |
| L      | type            | Text     | Full-time                                     | Yes      | Full-time, Contract, Freelance, Part-time  |
| M      | tags            | Text     | Python\|PyTorch\|LLM                          | No       | Pipe-separated skill tags                  |
| N      | posted_at       | Text     | 15m ago                                       | No       | Display text (e.g., "2h ago", "1d ago")    |
| O      | featured        | Boolean  | TRUE                                          | No       | TRUE or FALSE (case-insensitive)           |
| P      | ai_verified     | Boolean  | TRUE                                          | No       | TRUE or FALSE (case-insensitive)           |
| Q      | source          | Text     | Official Career Page                          | No       | "Manual" → shows as "Partner Network"      |
| R      | match_score     | Number   | 99                                            | No       | 0-100 match score                          |
| S      | summary         | Text     | Building next-gen recommendation models...    | No       | Short AI-generated summary                 |
| T      | apply_url       | URL      | https://tally.so/r/remotelingo-evolution      | Yes      | **CRITICAL:** Your Tally form or job URL   |

---

## 🎨 Available Tailwind Colors for `color` Column

```
bg-teal-500    (ByteDance)
bg-red-600     (Nintendo)
bg-black       (Shein, TikTok)
bg-blue-700    (Samsung)
bg-orange-500  (Alibaba)
bg-red-500     (Coupang)
bg-gray-900    (Evolution)
bg-purple-600
bg-green-600
bg-indigo-600
bg-pink-600
bg-yellow-500
```

---

## 📝 Example Row (Copy this for Evolution job)

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 8 | Game Presenter - Japanese Speaker | Evolution | EVO | bg-gray-900 | Japanese\|English | Native | 35000 | 55000 | EUR | Madrid, Spain (Relocation Package) | Full-time | Gaming\|Live Streaming\|Customer Service | 1d ago | TRUE | TRUE | Direct Recruiter | 93 | Competitive salary + monthly bonus. Relocation: flight + 25 days accommodation + €1,500 support. | https://tally.so/r/remotelingo-evolution-apply |

---

## 🚀 How to Publish Your Sheet

1. In Google Sheets, click **File → Share → Publish to web**
2. In the modal:
   - **Tab:** Select the specific sheet (or "Entire Document")
   - **Format:** Select **Comma-separated values (.csv)**
3. Click **Publish**
4. Copy the generated URL (looks like: `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv`)
5. Paste it into `app/page.tsx` at **line 202**:
   ```javascript
   const GOOGLE_SHEET_CSV_URL = "YOUR_CSV_URL_HERE";
   ```

---

## 🔄 How It Works

```
User loads website
    ↓
System tries to fetch from: Google Sheets CSV URL
    ↓
If Google Sheets fails → Try Supabase
    ↓
If Supabase fails → Use Mock Data
```

**Priority Order:** Google Sheets > Supabase > Mock Data

---

## ⚠️ Important Notes

1. **Column A is SKIPPED** - Use it for notes/IDs, but data starts from Column B (index 1)
2. **Pipe separator for arrays**: Use `|` for languages and tags (e.g., `Chinese|English`)
3. **Boolean values**: Must be `TRUE` or `FALSE` (case-insensitive)
4. **apply_url is CRITICAL**: This is where users will be redirected when they click "Apply Now"
5. **For referral jobs** (like Evolution): Use YOUR Tally form URL, not the company's career page
6. **Empty cells**: Leave blank, system will use defaults
7. **No commas in text fields**: Commas will break CSV parsing (use semicolons if needed)

---

## 💰 Referral Job Setup (Evolution Example)

**In Google Sheets:**
- `apply_url` = Your Tally form: `https://tally.so/r/remotelingo-evolution-apply`
- This URL is **visible to users**

**In your backend (separate tracking):**
- Track that this job has €2,000 commission
- When candidates submit via YOUR form, you control the referral
- Forward qualified candidates to Evolution
- Collect commission when they get hired

**Never mention commission in the job listing!**

---

## 🧪 Testing Your Setup

1. Publish your sheet as CSV
2. Copy the CSV URL
3. Update line 202 in `app/page.tsx`
4. Refresh the website
5. Check browser console for: `✅ Loaded X jobs from Google Sheets`
6. Click "Apply Now" on any job → Should open the `apply_url` from your sheet

---

## 📊 Quick Template (First Row = Headers)

```csv
ID,title,company,logo,color,languages,level,salary_min,salary_max,currency,location,type,tags,posted_at,featured,ai_verified,source,match_score,summary,apply_url
1,Senior AI Engineer (LLM),ByteDance,BD,bg-teal-500,Chinese (Mandarin)|English,Native,80000,140000,EUR,Remote (EU/UK),Full-time,Python|PyTorch|LLM,15m ago,TRUE,TRUE,Official Career Page,99,Building next-gen recommendation models for global e-commerce.,https://jobs.bytedance.com
```

Copy this template, paste into your Google Sheet, and start adding rows!
