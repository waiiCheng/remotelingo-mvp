/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // All deleted job IDs that Google has indexed
    // These will return 301 (Permanent Redirect) to homepage
    const deletedJobIds = [
      // FAANG fake jobs (deleted in first cleanup)
      501, 502, 503, 504, 505, 506, 507, 508,
      // Luxury brand fake jobs (deleted in first cleanup)
      701, 702, 703, 705, 706, 707, 708,
      // BPO fake jobs (deleted in second cleanup)
      204, 205, 206, 207, 208, 209, 210, 211,
    ];

    const jobRedirects = deletedJobIds.map(id => ({
      source: `/jobs/${id}`,
      destination: '/',
      permanent: true, // 301 - tells Google to remove from index
    }));

    return [
      // Direct redirect to Tally form
      {
        source: '/direct-apply',
        destination: 'https://tally.so/r/zxjRGR',
        permanent: false,
      },
      // All deleted job redirects
      ...jobRedirects,
    ];
  },
}

module.exports = nextConfig
