import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (
    process.env.SITE_URL || process.env.VITE_SITE_URL || process.env.PUBLIC_SITE_URL ||
    env.SITE_URL || env.VITE_SITE_URL || env.PUBLIC_SITE_URL || "https://putzelf.com"
  ).trim().replace(/\/+$/, "");

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl),
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
  };
});
