import BorderBox2, { componentName } from './config'

export default {
  componentName,
  component: () => import('./BorderBox.vue'),
  config: BorderBox2
}
