import BorderBox7, { componentName } from './config'

export default {
  componentName,
  component: () => import('./BorderBox.vue'),
  config: BorderBox7
}
