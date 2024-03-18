import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    base: "http://localhost:3001",
    build: {
      outDir: "build",
    },
    plugins: [react()],
  };
});
