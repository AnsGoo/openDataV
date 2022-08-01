import { ConfigProviderProps, createDiscreteApi } from 'naive-ui'
import { computed } from 'vue'

// const themeRef = ref<'light' | 'dark'>('dark')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({}))

const { message, dialog, notification, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)
export default { message, dialog, notification, loadingBar }
