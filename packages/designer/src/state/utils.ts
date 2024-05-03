export type Class = { new (...args: any[]): any }

export function singleton(className: Class): Class {
  let ins: Class
  return new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        ins = new target(...args)
      }
      return ins
    }
  })
}
