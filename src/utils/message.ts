import { createDiscreteApi, darkTheme } from 'naive-ui'

const { message, dialog, notification, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: {
      theme: darkTheme
    }
  }
)
export { dialog, loadingBar, message, notification }
