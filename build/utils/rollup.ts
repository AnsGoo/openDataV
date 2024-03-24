import { resolve } from 'path'

import { root } from './paths'

export const target = 'esnext'

export const getCompPackage = (pkg: string) => {
  const compPackage = resolve(root, pkg, 'package.json')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version, dependencies, peerDependencies = {} } = require(compPackage)
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}

export const generateExternal = (pkg: string, options: { full: boolean }) => {
  const { dependencies, peerDependencies = [] } = getCompPackage(pkg)

  const pkgs: string[] = peerDependencies

  if (options.full) {
    pkgs.push(...dependencies)
  }

  return (id: string) => {
    return pkgs.some((pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`)))
  }
}

export const generatePaths = (pkg) => {
  const paths = [
    ['lodash-es', 'lodash'],
    [`open-data-v/${pkg}/es`, `open-data-v/${pkg}/lib`]
  ]

  return (id: string) => {
    for (const [oldPath, newPath] of paths) {
      if (id.startsWith(oldPath)) {
        return id.replace(oldPath, newPath)
      }
    }

    return ''
  }
}
