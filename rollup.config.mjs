import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

function assetUrls() {
  return {
    name: 'asset-urls',
    load(id) {
      if (!/\.(glb|png|jpg|jpeg|webp)$/.test(id)) return null;
      const fileName = `assets/${path.basename(id)}`;
      this.emitFile({
        type: 'asset',
        fileName,
        source: fs.readFileSync(id)
      });
      return `export default ${JSON.stringify(`/${fileName}`)};`;
    }
  };
}

function html() {
  return {
    name: 'html',
    writeBundle() {
      fs.mkdirSync(dist, { recursive: true });
      fs.writeFileSync(
        path.join(dist, 'index.html'),
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI/LLM Portfolio</title>
    <link rel="stylesheet" href="/assets/index.css" />
    <script>window.process = { env: { NODE_ENV: 'production', VITE_SUPABASE_URL: ${JSON.stringify(process.env.VITE_SUPABASE_URL || '')}, VITE_SUPABASE_ANON_KEY: ${JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || '')} } };</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>
`
      );
    }
  };
}

export default {
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: 'assets/index.js',
    chunkFileNames: 'assets/[name]-[hash].js',
    assetFileNames: 'assets/[name][extname]',
    sourcemap: true
  },
  plugins: [
    assetUrls(),
    postcss({
      extract: 'assets/index.css',
      minimize: true
    }),
    resolve({
      browser: true,
      extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.app.json',
      compilerOptions: {
        noEmit: false,
        declaration: false,
        declarationMap: false
      }
    }),
    html()
  ]
};
