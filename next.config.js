/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "i.pravatar.cc"], // Legacy: Keep for any pravatar fallbacks
    remotePatterns: [
      // Existing
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      // New: Hero & Mock Data Sources
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.zenfs.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.japan-food.guide",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d3dqioy2sca31t.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ca-times.brightspotcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trovatrip.gumlet.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.seattleschild.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mma.prnewswire.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jessieonajourney.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adventurewomen.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vpt-en.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.usnews.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sdzsafaripark.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.outsideonline.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        port: "",
        pathname: "/**",
      },
      // Local uploads
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
