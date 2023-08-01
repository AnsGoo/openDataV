import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui'
import useCanvasState from 'open-data-v/designer/state/canvas'
import { computed } from 'vue'

const canvasState = useCanvasState()
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: !canvasState.darkTheme ? lightTheme : darkTheme
}))
const { message, dialog, notification, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)
export { dialog, loadingBar, message, notification }
