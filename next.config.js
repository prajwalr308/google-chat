/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "i.pravatar.cc",
      "links.papareact.com",
      "upload.wikimedia.org",
      "scontent.fblr20-3.fna.fbcdn.net",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
