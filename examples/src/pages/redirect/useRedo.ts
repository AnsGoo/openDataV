import { unref } from 'vue'
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'

const REDIRECT_NAME = 'Redirect'
/**
 * @description redo current page
 * @description reference [vue-vben-admin usePage]{@link https://github.com/vbenjs/vue-vben-admin/blob/7e0456cc6c2e612cb333382ad614041da68a13e9/src/hooks/web/usePage.ts#L30-L54}
 */
export const useRedo = (_router?: Router) => {
  const { replace, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      params['_origin_params'] = JSON.stringify(params ?? {})

      params['_redirect_type'] = name ? 'name' : 'path'
      params['path'] = name ? String(name) : fullPath

      replace({ name: REDIRECT_NAME, params, query }).then(() => resolve(true))
    })
  }
  return redo
}
