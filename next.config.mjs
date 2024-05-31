/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/6.x/initials/svg",
      },
      {
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
