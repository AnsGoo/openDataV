import Tabs, { componentName } from './config'

export default {
  componentName,
  component: () => import('./Tabs.vue'),
  config: Tabs
}
