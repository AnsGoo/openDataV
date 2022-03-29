import type { Directive, DirectiveBinding } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()

const checkAction = (el: HTMLElement, binding: DirectiveBinding) => {
  const action: string = binding.value
  const permissions = userStore.permissions || {}
  const { currentRoute } = useRouter()
  if (permissions[currentRoute.value.name!]) {
    const actionMap: string[] = permissions[currentRoute.value.name!]
    if (actionMap.includes(action)) {
      return
    } else {
      // el.parentNode?.removeChild(el)
      el.style.display = 'none'
    }
  }
}

const ActionDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    checkAction(el, binding)
  }
}

export default ActionDirective
