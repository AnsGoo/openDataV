import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import path, { resolve } from 'path'
import { rollup } from 'rollup'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import less from 'rollup-plugin-less'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'

import overrides from '../../packages/tsconfig.json'
import { root } from '../utils/paths'
import { generateExternal, target } from '../utils/rollup'

const build = async (pkg: string, minify: boolean) => {
  const input = path.resolve(root, pkg, 'index.ts').toString()
  overrides.include = overrides.include.map((el) => {
    return el.replace('scripts', pkg)
  })
  const bundle = await rollup({
    input,
    plugins: [
      nodeResolve(),
      // @ts-ignore
      vueDefineOptions(),
      // @ts-ignore
      vue(),
      // @ts-ignore
      vueJsx(),
      postcss({
        plugins: [autoprefixer()],
        extract: 'bundle.css'
      }),
      typescript({ tsconfigOverride: overrides }),
      less(),
      esbuild({
        target,
        sourceMap: minify,
        treeShaking: true
      }),
      minify
        ? minifyPlugin({
            target,
            sourceMap: minify
          })
        : null
    ],
    treeshake: true,
    external: generateExternal(pkg, { full: false })
  })

  const output = resolve(root, pkg, 'dist')

  await Promise.all([
    bundle.write({
      format: 'esm',
      file: path.resolve(output, pkg, `index${minify ? '.min' : ''}.mjs`),
      exports: undefined,
      sourcemap: minify
    }),
    bundle.write({
      format: 'umd',
      file: path.resolve(output, pkg, `index${minify ? '.min' : ''}.js`),
      exports: 'named',
      sourcemap: minify,
      name: `${pkg}`,
      globals: {
        vue: 'Vue'
      }
    })
  ])
}

export const buildFull = async () => {
  const packages = ['base', 'data', 'ui', 'scripts', 'designer']
  for (const el of packages) {
    await Promise.all([build(el, false), build(el, true)])
  }
}
