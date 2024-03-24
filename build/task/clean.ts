import fs from 'fs-extra'
import { root } from '../utils/paths'
import { resolve } from 'path'

export const clean = async () => {
  const packages = ['base', 'data', 'ui', 'scripts', 'designer']
  for (const el of packages) {
    const outputEsm = resolve(root, el, 'es')
    const outputCjs = resolve(root, el, 'lib')
    const output = resolve(root, el, 'dist')
    await Promise.all([
      fs.remove(resolve(output, el)),
      fs.remove(resolve(outputEsm, el)),
      fs.remove(resolve(outputCjs, el))
    ])
  }
}
