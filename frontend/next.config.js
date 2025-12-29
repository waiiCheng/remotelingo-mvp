/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Direct redirect to Tally form (if someone bypasses gatekeeper)
      {
        source: '/direct-apply',
        destination: 'https://tally.so/r/zxjRGR',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
