import type { Directive, DirectiveBinding } from 'vue'
import { createVNode, render } from 'vue'

import ContextmenuComponent from './ContextMenu.vue'
import type { ContextmenuItem } from './types'

const CTX_CONTEXTMENU_HANDLER = 'CTX_CONTEXTMENU_HANDLER'

const contextmenuListener = (el: HTMLElement, event: MouseEvent, binding: DirectiveBinding) => {
  event.preventDefault()
  const { stop } = binding.modifiers
  if (stop) {
    event.stopPropagation()
  } else {
    event.stopPropagation()
  }

  const menus = binding.value(el, event)
  if (!menus) return

  let container: HTMLDivElement | null = null

  // 移除右键菜单并取消相关的事件监听
  const removeContextmenu = () => {
    if (container) {
      document.body.removeChild(container)
      container = null
    }
    el.classList.remove('contextmenu-active')
    document.body.removeEventListener('scroll', removeContextmenu)
    window.removeEventListener('resize', removeContextmenu)
  }

  // 创建自定义菜单
  const options = {
    axis: { x: event.x, y: event.y },
    el,
    menus,
    removeContextmenu
  }
  container = document.createElement('div')
  const vm = createVNode(ContextmenuComponent, options, null)
  render(vm, container)
  document.body.appendChild(container)

  // 为目标节点添加菜单激活状态的className
  el.classList.add('contextmenu-active')

  // 页面变化时移除菜单
  document.body.addEventListener('scroll', removeContextmenu)
  window.addEventListener('resize', removeContextmenu)
}

const ContextmenuDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    const { capture } = binding.modifiers
    el[CTX_CONTEXTMENU_HANDLER] = (event: MouseEvent) => contextmenuListener(el, event, binding)
    el.addEventListener('contextmenu', el[CTX_CONTEXTMENU_HANDLER], capture)
  },

  unmounted(el: HTMLElement) {
    if (el && el[CTX_CONTEXTMENU_HANDLER]) {
      el.removeEventListener('contextmenu', el[CTX_CONTEXTMENU_HANDLER])
      delete el[CTX_CONTEXTMENU_HANDLER]
    }
  }
}

export default ContextmenuDirective

export type { ContextmenuItem }
