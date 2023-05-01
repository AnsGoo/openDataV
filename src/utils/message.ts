import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, lightTheme, darkTheme } from 'naive-ui'
import { computed } from 'vue'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const useMessage = () => {
  const projectStore = useProjectSettingStoreWithOut()
  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: !projectStore.darkTheme ? lightTheme : darkTheme
  }))
  const { message, dialog, notification, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef
    }
  )
  return { message, dialog, notification, loadingBar }
}
export default useMessage
