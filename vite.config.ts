import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import type { ConfigEnv, ProxyOptions, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import MarkDownPlugin from 'vite-plugin-vue-markdown'

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const { VITE_APP_PORT, VITE_APP_PROXY, VITE_MOCK } = loadEnv(mode, process.cwd())

  const createProxy = (proxyList) => {
    const ret = {} as Record<string, ProxyOptions>
    for (const [prefix, target] of proxyList) {
      ret[prefix] = {
        target: target,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${prefix}`), '')
      }
    }

    return ret
  }

  return {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/] // <--
      }),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        logger: true,
        localEnabled: command === 'serve',
        prodEnabled: VITE_MOCK === 'true',
        injectCode: `
        import { setupProdMockServer } from '../mock/mockProdServer';
        setupProdMockServer();
      `
      }),
      MarkDownPlugin({
        markdownItSetup(md) {
          md.use(require('./build/toc.js'))
        }
      })
    ],
    base: './',
    resolve: {
      alias: {
        // 路径别名
        '@': resolve(__dirname, 'examples'),
        'open-data-v': resolve(__dirname, 'src'),
        docs: resolve(__dirname, 'docs')
      },
      // 使用路径别名时想要省略的后缀名，官方不建议将.vue文件省略后缀
      extensions: ['.js', '.ts', '.tsx', '.jsx']
    },
    server: {
      // 是否开启 https
      https: false,
      port: Number(VITE_APP_PORT),
      host: '0.0.0.0',
      open: false,
      proxy: createProxy(JSON.parse(VITE_APP_PROXY)),
      fs: {
        allow: ['..'],
        strict: false
      },
      cors: true
    },
    build: {
      target: 'es2022',
      chunkSizeWarningLimit: 1500
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('examples/css/index.less')}";`
          },
          javascriptEnabled: true
        }
      },
      modules: {
        localsConvention: 'camelCase'
      }
    }
  }
}
