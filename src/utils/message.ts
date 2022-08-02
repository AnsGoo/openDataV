import { ConfigProviderProps, createDiscreteApi } from 'naive-ui'
import { computed } from 'vue'

// const themeRef = ref<'light' | 'dark'>('dark')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({}))

const { message, dialog, notification } = createDiscreteApi(['message', 'dialog', 'notification'], {
  configProviderProps: configProviderPropsRef
})
export { message, dialog, notification }
