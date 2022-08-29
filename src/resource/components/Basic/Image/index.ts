import ImageComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./Image.vue'),
  config: ImageComponent
}
