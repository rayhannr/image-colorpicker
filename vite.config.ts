import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

const availableEnvVars: string[] = [];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv: Record<string, any> = {};
  availableEnvVars.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
  };
});
