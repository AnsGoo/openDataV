import type { Directive, DirectiveBinding } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()

const checkAction = (el: HTMLElement, binding: DirectiveBinding) => {
  const action: string = binding.value
  const permissions = userStore.permissions || {}
  const routeName = binding.instance?.$route.name
  if (routeName && permissions[routeName]) {
    const actionMap: string[] = permissions[routeName]
    if (actionMap && actionMap.includes(action)) {
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
