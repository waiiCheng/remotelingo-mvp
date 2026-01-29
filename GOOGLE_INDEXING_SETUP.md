# Google Indexing API Setup Guide

## 🎯 Purpose

This script notifies Google about all job pages immediately after deployment, significantly speeding up indexing time from weeks to hours/days.

---

## 🔐 Step 1: Create Service Account (IMPORTANT)

### A. Revoke Old Credentials (If Exposed)
If you previously shared credentials, delete the old service account:
```
1. Visit: https://console.cloud.google.com/iam-admin/serviceaccounts?project=ultra-envoy-482605-j3
2. Find: index-442@ultra-envoy-482605-j3.iam.gserviceaccount.com
3. Click "..." → Delete
```

### B. Create NEW Service Account
```
1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Name: "remotelingo-indexing"
4. Description: "Service account for Google Indexing API"
5. Click "Create and Continue"
6. Grant role: "Service Account User"
7. Click "Done"
```

### C. Create Key
```
1. Click on the newly created service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON"
5. Click "Create"
6. Save the downloaded file
```

### D. Enable Google Indexing API
```
1. Visit: https://console.cloud.google.com/apis/library/indexing.googleapis.com
2. Click "Enable"
3. Wait for activation (usually instant)
```

### E. Add Service Account to Search Console
```
1. Open the downloaded JSON file
2. Copy the "client_email" value (e.g., remotelingo-indexing@project.iam.gserviceaccount.com)
3. Go to: https://search.google.com/search-console
4. Select your property (remotelingo.com)
5. Settings → Users and permissions
6. Click "Add user"
7. Paste the client_email
8. Permission level: "Owner"
9. Click "Add"
```

---

## 📁 Step 2: Save Service Account File

**CRITICAL: This file contains sensitive credentials!**

```bash
# Save the downloaded JSON file as:
C:\Users\waiip\Desktop\RemoteLingo\service-account.json

# Verify it's in .gitignore (already done):
# - service-account.json
# - *service-account*.json
```

**Never commit this file to Git!**

---

## 📦 Step 3: Install Dependencies

```bash
cd C:\Users\waiip\Desktop\RemoteLingo\frontend
npm install
```

This installs the `googleapis` package needed for the script.

---

## 🚀 Step 4: Run the Script

```bash
cd C:\Users\waiip\Desktop\RemoteLingo\frontend
npm run index:google
```

### Expected Output:
```
═══════════════════════════════════════════════════════
  Google Indexing API - RemoteLingo Job Pages
═══════════════════════════════════════════════════════

✓ Service account file found
✓ Google Indexing API client initialized

📋 Total URLs to notify: 26
   - Homepage: 1
   - Sitemap: 1
   - Job pages: 24

Starting indexing requests...

[1/26] https://remotelingo.com ... ✓
[2/26] https://remotelingo.com/sitemap.xml ... ✓
[3/26] https://remotelingo.com/jobs/501 ... ✓
...
[25/26] https://remotelingo.com/jobs/801 ... ✓
[26/26] https://remotelingo.com/jobs/802 ... ✓

═══════════════════════════════════════════════════════
  Summary
═══════════════════════════════════════════════════════

✓ Successful: 26
✗ Failed: 0

🇰🇷 Korean Jobs Notified:
  ✓ Job 801: https://remotelingo.com/jobs/801
  ✓ Job 802: https://remotelingo.com/jobs/802

═══════════════════════════════════════════════════════
✓ Indexing notification complete!
═══════════════════════════════════════════════════════

Next steps:
1. Check Google Search Console for indexing status
2. URLs typically appear in search within 24-48 hours
3. Re-run this script after adding new jobs
```

---

## 🔄 When to Run This Script

Run `npm run index:google` after:
- ✅ Deploying new job pages
- ✅ Updating existing job content
- ✅ Major site changes (new features, redesign)
- ✅ Initial setup (first time)

**Frequency:**
- Daily quota: 200 requests/day
- Our script uses 26 requests (well within limit)
- Safe to run multiple times per day if needed

---

## 🐛 Troubleshooting

### Error: "service-account.json not found"
```
Solution: Make sure the file is saved at:
C:\Users\waiip\Desktop\RemoteLingo\service-account.json
```

### Error: "Permission denied" or "403 Forbidden"
```
Solution:
1. Make sure you added the service account email to Search Console
2. Grant "Owner" permission (not just "Full")
3. Wait 5 minutes for permissions to propagate
```

### Error: "API not enabled"
```
Solution:
1. Visit: https://console.cloud.google.com/apis/library/indexing.googleapis.com
2. Click "Enable"
3. Wait 1-2 minutes
4. Try again
```

### Error: "Invalid credentials"
```
Solution:
1. Delete old service-account.json
2. Create a new service account (see Step 1)
3. Download new JSON file
4. Save it and try again
```

---

## 📊 Verify Indexing Status

### Google Search Console:
```
1. Visit: https://search.google.com/search-console
2. Select: remotelingo.com
3. Go to: Coverage → Valid
4. Check for your job URLs
```

### Manual Check:
```
Search Google for:
site:remotelingo.com/jobs/801

If indexed, you'll see the job page in results.
```

---

## 🔒 Security Best Practices

✅ **DO:**
- Keep service-account.json in .gitignore
- Store it securely (encrypted drive, password manager)
- Rotate credentials every 90 days
- Use separate service accounts for dev/prod

❌ **DON'T:**
- Commit service-account.json to Git
- Share credentials in chat/email
- Use the same credentials across projects
- Store in public cloud storage

---

## 📝 Adding New Jobs

When you add new jobs to `jobsData.ts`:

1. **Update the script:**
   ```javascript
   // In scripts/trigger-indexing.js, update JOB_IDS array:
   const JOB_IDS = [
     501, 506, 504, 505, 502, 503, 507, 508, 509, 510,
     511, 512, 601, 602, 603, 604, 605, 606, 607, 608,
     707, 708, 801, 802,
     803, 804  // Add new job IDs here
   ];
   ```

2. **Run the script:**
   ```bash
   npm run index:google
   ```

3. **Verify in Search Console** (24-48 hours later)

---

## 🎯 Expected Results

### Timeline:
- **Immediate:** Google receives notification
- **1-6 hours:** Google crawls the pages
- **24-48 hours:** Pages appear in search results
- **1 week:** Full indexing with rich results (JobPosting schema)

### Korean Jobs SEO Impact:
- Job 801 (CreedRoomz): Targets "한국어 해외 취업", "아르메니아 한국인 채용"
- Job 802 (FX Cyprus): Targets "키프로스 금융 채용", "한국어 VIP 매니저"

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify service account permissions in Search Console
3. Check API quota: https://console.cloud.google.com/apis/api/indexing.googleapis.com/quotas

---

**Last Updated:** 2026-01-29
**Script Version:** 1.0.0
