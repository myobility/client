import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/token": {
        target: "https://agora-token-service-production-a2f2.up.railway.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/token/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
