import { execa } from 'execa'
import { src, dest } from 'gulp'
import { root } from '../utils/paths'
import { resolve } from 'path'

export const generateType = async (el: string) => {
  // const { stdout } = await execa('pwd')
  // console.log('------', stdout)
  const { stdout } = await execa('vue-tsc', ['-p', '../packages/tsconfig.declaration.json'], {
    cwd: root
  })

  console.log('------', stdout)

  const outputEsm = resolve(root, el, 'es')
  const outputCjs = resolve(root, el, 'lib')
  return src(`${outputEsm}/**/*.d.ts`).pipe(dest(`${outputCjs}`))
}

export const generateTypes = async () => {
  const packages = ['base', 'data', 'ui', 'scripts', 'designer']
  packages.forEach(async (el) => {
    await generateType(el)
  })
}
