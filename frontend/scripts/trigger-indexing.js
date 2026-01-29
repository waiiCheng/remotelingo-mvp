/**
 * Google Indexing API - Trigger Indexing for All Job Pages
 *
 * This script notifies Google about all job pages for faster indexing.
 * Run this after deploying new jobs or updating existing ones.
 *
 * Usage: npm run index:google
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://remotelingo.com';
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../../service-account.json');

// Hardcoded job IDs (update this when adding new jobs)
// This avoids TypeScript import issues
const JOB_IDS = [
  501, 506, 504, 505, 502, 503, 507, 508, 509, 510,
  511, 512, 601, 602, 603, 604, 605, 606, 607, 608,
  707, 708, 801, 802
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Validate service account file exists
 */
function validateServiceAccount() {
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`${colors.red}❌ Error: service-account.json not found!${colors.reset}`);
    console.error(`${colors.yellow}Expected location: ${SERVICE_ACCOUNT_PATH}${colors.reset}`);
    console.error(`\n${colors.cyan}Please:`);
    console.error(`1. Download your service account JSON from Google Cloud Console`);
    console.error(`2. Save it as: C:\\Users\\waiip\\Desktop\\RemoteLingo\\service-account.json`);
    console.error(`3. Make sure it's NOT committed to Git (check .gitignore)${colors.reset}\n`);
    process.exit(1);
  }

  console.log(`${colors.green}✓ Service account file found${colors.reset}`);
}

/**
 * Initialize Google Indexing API client
 */
async function initializeClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_PATH,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    console.log(`${colors.green}✓ Google Indexing API client initialized${colors.reset}\n`);
    return indexing;
  } catch (error) {
    console.error(`${colors.red}❌ Failed to initialize API client:${colors.reset}`, error.message);
    process.exit(1);
  }
}

/**
 * Notify Google about a single URL
 */
async function notifyUrl(indexing, url, type = 'URL_UPDATED') {
  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type, // URL_UPDATED or URL_DELETED
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Google Indexing API - RemoteLingo Job Pages${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

  // Step 1: Validate service account
  validateServiceAccount();

  // Step 2: Initialize API client
  const indexing = await initializeClient();

  // Step 3: Prepare URLs to index
  const urls = [
    BASE_URL, // Homepage
    `${BASE_URL}/sitemap.xml`, // Sitemap
  ];

  // Add all job pages
  JOB_IDS.forEach(jobId => {
    urls.push(`${BASE_URL}/jobs/${jobId}`);
  });

  console.log(`${colors.blue}📋 Total URLs to notify: ${urls.length}${colors.reset}`);
  console.log(`${colors.blue}   - Homepage: 1${colors.reset}`);
  console.log(`${colors.blue}   - Sitemap: 1${colors.reset}`);
  console.log(`${colors.blue}   - Job pages: ${JOB_IDS.length}${colors.reset}\n`);

  // Step 4: Notify Google about each URL
  const results = {
    success: [],
    failed: [],
  };

  console.log(`${colors.cyan}Starting indexing requests...${colors.reset}\n`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const progress = `[${i + 1}/${urls.length}]`;

    process.stdout.write(`${progress} ${url} ... `);

    const result = await notifyUrl(indexing, url);

    if (result.success) {
      console.log(`${colors.green}✓${colors.reset}`);
      results.success.push(url);
    } else {
      console.log(`${colors.red}✗ ${result.error}${colors.reset}`);
      results.failed.push({ url, error: result.error });
    }

    // Rate limiting: Wait 100ms between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Step 5: Summary
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Summary${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.green}✓ Successful: ${results.success.length}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${results.failed.length}${colors.reset}\n`);

  if (results.failed.length > 0) {
    console.log(`${colors.yellow}Failed URLs:${colors.reset}`);
    results.failed.forEach(({ url, error }) => {
      console.log(`  ${colors.red}✗${colors.reset} ${url}`);
      console.log(`    ${colors.yellow}Error: ${error}${colors.reset}`);
    });
    console.log();
  }

  // Step 6: Korean jobs highlight
  const koreanJobIds = [801, 802];
  console.log(`${colors.cyan}🇰🇷 Korean Jobs Notified:${colors.reset}`);
  koreanJobIds.forEach(jobId => {
    const url = `${BASE_URL}/jobs/${jobId}`;
    const status = results.success.includes(url)
      ? `${colors.green}✓${colors.reset}`
      : `${colors.red}✗${colors.reset}`;
    console.log(`  ${status} Job ${jobId}: ${url}`);
  });
  console.log();

  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}✓ Indexing notification complete!${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.yellow}Next steps:${colors.reset}`);
  console.log(`1. Check Google Search Console for indexing status`);
  console.log(`2. URLs typically appear in search within 24-48 hours`);
  console.log(`3. Re-run this script after adding new jobs\n`);
}

// Execute
main().catch(error => {
  console.error(`${colors.red}❌ Fatal error:${colors.reset}`, error);
  process.exit(1);
});
