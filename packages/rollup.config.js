/* eslint-disable */
const typescript = require('rollup-plugin-typescript2')
const vuePlugin = require('rollup-plugin-vue')
const autoprefixer = require('autoprefixer');
const postcss = require('rollup-plugin-postcss');
// 如果依赖模块中存在 es 模块，需要使用 @rollup/plugin-node-resolve 插件进行转换
const nodeResolve = require('@rollup/plugin-node-resolve')
const overrides = require( './tsconfig.json')
const vueJsx  = require('@vitejs/plugin-vue-jsx')
const esbuild = require('rollup-plugin-esbuild')
const  less  = require('rollup-plugin-less')


console.log(esbuild)
const build = (pkg) => {
  const name = `@open-data-v/${pkg}`
  overrides.include = overrides.include.map(el => {
    return el.replace('scripts',pkg)
  })
  overrides.compilerOptions.outDir = `./dist/${pkg}`
  return {
    input: `./${pkg}/src/index.ts`,
    output: [
      {
        dir: `./${pkg}/lib`,
        exports: 'named',
        sourcemap: true,
        format: 'cjs', // 编译模式
        entryFileNames:'[name].js',
        inlineDynamicImports:true,
      },
      {
        dir: `./${pkg}/es`,
        name: pkg,
        sourcemap: true,
        format: 'esm', // 编译模式
        preserveModules: true,
        entryFileNames:'[name].esm.mjs',
        inlineDynamicImports: false,
        exports: undefined,
        preserveModulesRoot:`${pkg}/src`,
        extend:['node_modules']

      },
      {
        dir: `./${pkg}/umd`,
        name: pkg,
        sourcemap: true,
        inlineDynamicImports:true,
        format: 'umd', // 编译模式
        entryFileNames:'[name].umd.js',
        globals: {
          vue: 'Vue'
        }
      }
    ],
    plugins: [
      nodeResolve(),
      typescript({ tsconfigOverride: overrides }),
      vuePlugin({
        include: [/\.vue$/, /\.md$/]
      }),
      vueJsx(),
      postcss({
        plugins: [autoprefixer()],
        extract: true,
        modules:true,
        use: {
          sass: null,
          stylus: null,
          less: { javascriptEnabled: true }
        },
        config:{
          path: '../examples/postcss.config'
        }
      }),
      esbuild.default({
        target:'esnext',
        sourceMap: true,
        treeShaking: true
      }),
      esbuild.minify({
        target:'esnext',
        sourceMap: true
      }),
    ],
    treeshake: true,
    external: ['vue'] // 依赖模块
  }
}
module.exports = build('data')