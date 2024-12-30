import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  esbuild: {
    include: /src\/.*\.js$/
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@settings": path.resolve(__dirname, "./src/settings"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@img": path.resolve(__dirname, "./src/img"),
    },
  },
})
