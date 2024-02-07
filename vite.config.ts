import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
//   esbuild:  {
//     drop: ['console', 'debugger'],
//   },
// });

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    esbuild: !!process.env.PROD && {
      drop: ['console', 'debugger'],
    },
  });
};
