import type { Directive, DirectiveBinding } from 'vue'

const CLICK_HANDLER = 'CLICK_HANDLER'

const outsideHandle = (el: HTMLElement, binding: DirectiveBinding) => {
  const clickoutside = binding.value
  const handler = function (e: MouseEvent) {
    if (el && !el.contains(<HTMLInputElement>e.target!)) {
      if (el.style.display != 'none') {
        clickoutside(e)
      } else {
        return false
      }
    }
  }
  el[CLICK_HANDLER] = handler
  document.addEventListener('mousedown', handler, { capture: true })
}
const ClickOutsideDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    outsideHandle(el, binding)
  },

  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el[CLICK_HANDLER])
    delete el[CLICK_HANDLER]
  }
}

export default ClickOutsideDirective
