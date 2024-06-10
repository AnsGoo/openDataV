import BorderBoxComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./BorderBox.vue'),
  config: BorderBoxComponent
}
