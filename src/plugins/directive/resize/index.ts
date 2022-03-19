import type { Directive, DirectiveBinding } from 'vue'

const RESIZE_OBSERVE = 'RESIZE_OBSERVE'

const resizeDOM = (el: HTMLElement, binding: DirectiveBinding) => {
  const resizeHandler: ResizeObserverCallback = binding.value
  const resizeObserver = new ResizeObserver(resizeHandler)
  resizeObserver.observe(el)
  return resizeObserver
}

const ResizeDomDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    el[RESIZE_OBSERVE] = resizeDOM(el, binding)
  },

  unmounted(el: HTMLElement) {
    if (el && el[RESIZE_OBSERVE]) {
      const resizeObserver: ResizeObserver = el[RESIZE_OBSERVE]
      resizeObserver.unobserve(el)
      resizeObserver.disconnect()
      delete el[RESIZE_OBSERVE]
    }
  }
}

export default ResizeDomDirective
