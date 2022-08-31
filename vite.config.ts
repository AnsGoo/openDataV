import { UserConfigExport, ConfigEnv, loadEnv, ProxyOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const { VITE_APP_PORT, VITE_APP_PROXY, VITE_MOCK } = loadEnv(mode, process.cwd())

  const createProxy = (propxyList) => {
    const ret = {} as Record<string, ProxyOptions>
    for (const [prefix, target] of propxyList) {
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
      vue(),
      viteMockServe({
        mockPath: 'mock',
        supportTs: true, //如果使用 js发开，则需要配置 supportTs 为 false
        logger: true,
        localEnabled: command === 'serve',
        prodEnabled: VITE_MOCK === 'true',
        injectCode: `
        import { setupProdMockServer } from '../mock/mockProdServer';
        setupProdMockServer();
      `
      })
    ],
    base: './',
    resolve: {
      alias: {
        // 路径别名
        '@': resolve(__dirname, 'src')
      },
      // 使用路径别名时想要省略的后缀名，官方不建议将.vue文件省略后缀
      extensions: ['.js', '.ts']
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
      }
    },
    build: {
      target: 'es2015',
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/css/index.less')}";`
          },
          javascriptEnabled: true
        }
      }
    }
  }
}
