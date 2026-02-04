# 🚀 Deployment Guide - SEO Landing Pages

## Quick Deployment Steps

### Option A: Vercel (Recommended)
```bash
cd frontend
vercel --prod
```

### Option B: Other Platforms
```bash
# Build production version
npm run build

# Deploy using your platform's CLI
# (Netlify, AWS, etc.)
```

---

## Post-Deployment Checklist

### 1. Verify Landing Pages Live
Visit these URLs on your production domain:

```
https://remotelingo.com/ko/malta-jobs
https://remotelingo.com/ko/cyprus-jobs
https://remotelingo.com/ko/working-holiday-europe
https://remotelingo.com/ko/overseas-internship
https://remotelingo.com/ko/visa-sponsorship-jobs
https://remotelingo.com/ko/game-presenter-jobs
```

### 2. Check Sitemap
```
https://remotelingo.com/sitemap.xml
```
Should include all 6 landing pages

### 3. Submit to Search Engines

**Google Search Console:**
1. Go to: https://search.google.com/search-console
2. Select your property
3. Go to "Sitemaps" in left menu
4. Submit: https://remotelingo.com/sitemap.xml
5. Go to "URL Inspection"
6. Request indexing for each landing page

**Naver Webmaster Tools:**
1. Go to: https://searchadvisor.naver.com
2. Login and select your site
3. Go to "요청" (Request) → "사이트맵 제출" (Submit Sitemap)
4. Submit: https://remotelingo.com/sitemap.xml
5. Request indexing for landing pages

### 4. Monitor Results

**Week 1:**
- Check Google Search Console for indexing status
- Verify pages appear in "Coverage" report
- Monitor for any errors

**Week 2-4:**
- Track impressions and clicks
- Monitor keyword rankings
- Check organic traffic in Analytics

---

## Testing Production URLs

### Test Each Landing Page:

1. **Malta Jobs**
   - URL: https://remotelingo.com/ko/malta-jobs
   - Check: Only Malta jobs show
   - Verify: Meta tags correct

2. **Cyprus Jobs**
   - URL: https://remotelingo.com/ko/cyprus-jobs
   - Check: Only Cyprus jobs show
   - Verify: Meta tags correct

3. **Working Holiday**
   - URL: https://remotelingo.com/ko/working-holiday-europe
   - Check: Jobs with visa/relocation support
   - Verify: Meta tags correct

4. **Overseas Internship**
   - URL: https://remotelingo.com/ko/overseas-internship
   - Check: Entry-level jobs show
   - Verify: Meta tags correct

5. **Visa Sponsorship**
   - URL: https://remotelingo.com/ko/visa-sponsorship-jobs
   - Check: Jobs with visa tags
   - Verify: Meta tags correct

6. **Game Presenter**
   - URL: https://remotelingo.com/ko/game-presenter-jobs
   - Check: Gaming jobs show
   - Verify: Meta tags correct

---

## SEO Validation Tools

### 1. Google Rich Results Test
```
https://search.google.com/test/rich-results
```
Test each landing page URL

### 2. Meta Tags Checker
```
https://metatags.io/
```
Verify OpenGraph tags for social sharing

### 3. Mobile-Friendly Test
```
https://search.google.com/test/mobile-friendly
```
Ensure responsive design works

### 4. PageSpeed Insights
```
https://pagespeed.web.dev/
```
Check performance scores

---

## Expected Timeline

### Day 1-3:
- Deploy to production
- Submit sitemap
- Request indexing

### Week 1:
- Pages get indexed
- Appear in search console
- Initial impressions

### Week 2-4:
- Start ranking for long-tail keywords
- First organic clicks
- 50-100 visits/month

### Month 2-3:
- Rank on page 1 for some keywords
- 200-500 visits/month
- 10-20 applications

### Month 6+:
- Top 3 rankings
- 1,000+ visits/month
- 30-50 applications

---

## Troubleshooting

### Issue: Pages not indexing
**Solution:**
- Check robots.txt allows crawling
- Verify sitemap is accessible
- Manually request indexing in Search Console

### Issue: Wrong jobs showing
**Solution:**
- Check contentFilter in config
- Verify job data has correct tags/locations
- Test filtering logic locally

### Issue: Meta tags not showing
**Solution:**
- Clear CDN cache
- Hard refresh browser (Ctrl+Shift+R)
- Check page source for meta tags

---

## Success Metrics to Track

### Google Search Console:
- Impressions per keyword
- Click-through rate (CTR)
- Average position
- Total clicks

### Google Analytics:
- Organic traffic to landing pages
- Bounce rate
- Time on page
- Conversion rate (applications)

### Business Metrics:
- Applications from SEO traffic
- Cost per acquisition
- Quality of leads
- ROI on SEO investment

---

**Ready to deploy?** Run `vercel --prod` in the frontend directory!
