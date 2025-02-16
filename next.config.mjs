// const nextConfig = {
//   images: {
//     domains: ["res.cloudinary.com", "media.licdn.com"], // Add media.licdn.com here
//   },
// };

// export default nextConfig;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Add these new configurations
  headers: async () => [
    {
      source: "/:path*.bin",
      headers: [
        {
          key: "Content-Type",
          value: "application/octet-stream",
        },
      ],
    },
    {
      source: "/:path*.gltf",
      headers: [
        {
          key: "Content-Type",
          value: "model/gltf+json",
        },
      ],
    },
  ],
};

export default nextConfig;
