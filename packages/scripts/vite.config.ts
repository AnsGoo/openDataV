import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// @ts-ignore
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: false,
  plugins: [
    vue(),
    vueJsx(),
    dts({
      // entryRoot: './src',
      outDir: ['es', 'lib'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      tsconfigPath: '../tsconfig.json'
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src'),
      name: 'scripts',
      fileName: (format) => `index.${format}.js` // 输出文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'lodash-es', '@open-data-v/base', '@open-data-v/ui'],
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].esm.js',
          preserveModules: true,
          preserveModulesRoot: 'src',
          globals: {
            vue: 'Vue'
          }
        },
        {
          format: 'cjs',
          dir: 'lib',
          entryFileNames: '[name].umd.cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      ]
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: 'esbuild'
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        javascriptEnabled: true
      }
    },
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
