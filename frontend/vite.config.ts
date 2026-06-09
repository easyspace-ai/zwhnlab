import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 產物目錄：與部署約定一致，Go 服務從可執行檔同目錄的 web/ 提供靜態頁（可複製整個 web 到二進位旁）
    build: {
      outDir: path.resolve(__dirname, '../bin/static'),
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('monaco-editor') || id.includes('@monaco-editor')) return 'monaco';
            if (id.includes('recharts') || id.includes('lightweight-charts')) return 'charts';
            if (id.includes('html2pdf')) return 'html2pdf';
            if (id.includes('@slideglance')) return 'slideglance';
          },
        },
      },
    },
   
    plugins: [react(), tailwindcss(), wasm(), topLevelAwait()],
    worker: {
      format: 'es',
      plugins: () => [wasm(), topLevelAwait()],
    },
    optimizeDeps: {
      exclude: ['@slideglance/core', '@slideglance/viewer'],
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'import.meta.env.VITE_OSINT_HTTP_PREFIX': JSON.stringify(
        env.VITE_OSINT_HTTP_PREFIX ?? '/api/v1/intelligence',
      ),
      'import.meta.env.VITE_OSINT_ROUTE_BASE': JSON.stringify(
        env.VITE_OSINT_ROUTE_BASE ?? '/ai-session',
      ),
    },
    resolve: {
      // frontend-openui 子目录自有 node_modules；不复用同一 React 会触发 Invalid hook call
      dedupe: ['react', 'react-dom', 'zustand', 'lightweight-charts'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      },
    },
    server: {
      port: 8123,
      host: true,
      proxy: {
        /** 须与 backend/.env 的 PORT 一致；Go 默认见 cmd/server main.go（未设 PORT 时为 8787） */
        '/api/markets': {
          target: 'http://127.0.0.1:8100',
          changeOrigin: true,
        },
        /** Guizang HTML → image PPTX export (frontend/server/ppthtml-export) */
        '/api/ppthtml/export': {
          target: env.VITE_PPTHTML_EXPORT_PROXY_TARGET?.trim() || 'http://127.0.0.1:6125',
          changeOrigin: true,
        },
        '/api': {
          target: env.VITE_BACKEND_PROXY_TARGET?.trim() || 'http://127.0.0.1:8100',
          changeOrigin: true,
        },
        /** 与生产一致：经主后端 /daily-api 代理至 DailyAPI，勿直连 7220 */
        '/daily-api': {
          target: env.VITE_BACKEND_PROXY_TARGET?.trim() || 'http://127.0.0.1:8100',
          changeOrigin: true,
        },
        '/api/ws': {
          target: (() => {
            const t = env.VITE_BACKEND_PROXY_TARGET?.trim() || 'http://127.0.0.1:8100';
            return t.startsWith('http') ? t.replace(/^http/, 'ws') : `ws://${t}`;
          })(),
          ws: true,
        },
      },
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
