/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Direct redirect to Tally form (if someone bypasses gatekeeper)
      {
        source: '/direct-apply',
        destination: 'https://tally.so/r/zxjRGR',
        permanent: false,
      },
      // Redirect deleted fake BPO jobs (204-211) to homepage
      // These were indexed by Google but have been removed
      {
        source: '/jobs/204',
        destination: '/',
        permanent: true, // 301 redirect - tells Google to remove from index
      },
      {
        source: '/jobs/205',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/206',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/207',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/208',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/209',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/210',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs/211',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
