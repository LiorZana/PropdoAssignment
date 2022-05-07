import react from '@vitejs/plugin-react';
import Checker from 'vite-plugin-checker';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

const viteEnv: { import: { meta: ImportMeta['env'] } } = { import: { meta: import.meta.env } };
Object.keys(process.env).forEach(key => {
  if (key.startsWith(`VITE_`)) {
    viteEnv.import.meta[key] = process.env[key];
  }
});

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

const shouldAnalyze = process.env.ANALYZE;

const config: UserConfig = {
  publicDir: 'public',
  envDir: './',
  envPrefix: 'VITE_',
  define: viteEnv,
  css: { postcss: { plugins: [autoprefixer()] } },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  build: {
    rollupOptions: {
      plugins: !!shouldAnalyze ? [visualizer({ open: true, filename: './bundle-size/bundle.html' })] : []
    },
    sourcemap: !!shouldAnalyze
  },
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    Checker({
      typescript: true,
      overlay: true,
      eslint: {
        lintCommand: 'eslint',
        dev: {
          overrideConfig: {
            extensions: ['.ts', '.tsx']
          }
        }
      }
    })
  ]
};

const getConfig = () => config;

export default getConfig;
