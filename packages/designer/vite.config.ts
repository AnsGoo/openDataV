import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// @ts-ignore
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

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
    }),
    visualizer()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src'),
      name: 'designer',
      fileName: (format) => `index.${format}.js` // 输出文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'lodash-es',
        '@open-data-v/base',
        '@open-data-v/data',
        '@open-data-v/ui',
        '@open-data-v/scripts',
        '@vicons/antd',
        '@vicons/carbon',
        '@vicons/fa',
        '@vicons/fluent',
        '@vicons/ionicons4',
        '@vicons/ionicons5',
        '@vicons/material',
        '@vicons/utils',
        'dexie'],
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
