import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const baseUrl = process.env.VITE_SERVER_URL;

  return defineConfig({
    plugins: [react()],

    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },

    server: {
      proxy: {
        "/api": {
          target: baseUrl,
          changeOrigin: true,
        },
      },
    },
  });
};
