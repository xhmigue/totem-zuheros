import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import terminal from "vite-plugin-terminal";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    base: env.BASE_NAME,
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react(), terminal()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.TEST": JSON.stringify(env.TEST),
      "process.env.BASE_NAME": JSON.stringify(env.BASE_NAME),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
