import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import less from 'rollup-plugin-less'
import path, { resolve } from 'path'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import typescript from 'rollup-plugin-typescript2'
import overrides from '../../packages/tsconfig.json'
import { root } from '../utils/paths'
import { generateExternal, generatePaths, target } from '../utils/rollup'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
export const buildModule = async (pkg: string) => {
  const input = path.resolve(root, pkg, 'index.ts')

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
      less(),
      postcss({
        plugins: [autoprefixer()],
        extract: 'bundle.css'
      }),
      typescript({ tsconfigOverride: overrides }),
      esbuild({
        target,
        sourceMap: true,
        exclude: ['../examples/*']
      })
    ],
    treeshake: false,
    external: generateExternal(pkg, { full: true })
  })

  const outputEsm = resolve(root, pkg, 'es')
  const outputCjs = resolve(root, pkg, 'lib')

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].mjs`
    }),
    bundle.write({
      format: 'cjs',
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`,
      paths: generatePaths(pkg)
    })
  ])
}
export const buildModules = () => {
  const packages = ['base', 'data', 'ui', 'scripts', 'designer']
  packages.forEach(async (el) => {
    await buildModule(el)
  })
}
