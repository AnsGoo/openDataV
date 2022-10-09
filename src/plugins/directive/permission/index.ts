import type { Directive, DirectiveBinding } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()

const checkAction = (el: HTMLElement, binding: DirectiveBinding) => {
  const action: string = binding.value
  const permissions: string[] = userStore.permissions || []
  if (action) {
    if (permissions.includes(action)) {
      return
    } else {
      el.parentNode?.removeChild(el)
    }
  }
}

const ActionDirective: Directive = {
  created(el: HTMLElement, binding) {
    checkAction(el, binding)
  }
}

export default ActionDirective
