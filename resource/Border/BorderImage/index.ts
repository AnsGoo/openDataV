import BorderImage, { componentName } from './config'

export default {
  componentName,
  component: () => import('./BorderImage.vue'),
  config: BorderImage
}
