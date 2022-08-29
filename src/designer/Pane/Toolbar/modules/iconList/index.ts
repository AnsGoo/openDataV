import { render, createVNode } from 'vue'
import IconFont from './IconFont.vue'

const showIconCard = () => {
  const vm = createVNode(IconFont, {}, null)
  const container = document.createElement('div')
  const app = document.querySelector('#app')
  render(vm, container)
  app?.appendChild(container)
}

export default showIconCard
