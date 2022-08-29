import { render, createVNode } from 'vue'
import SavePage from './SavePage.vue'

const showSaveCard = (index: string) => {
  const vm = createVNode(
    SavePage,
    {
      index: index
    },
    null
  )
  const container = document.createElement('div')
  render(vm, container)
}

export default showSaveCard
