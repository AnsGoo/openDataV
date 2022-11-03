import BorderImage, { componentName } from './config'

export default {
  componentName,
  component: () => import('./src/BorderImage.vue'),
  config: BorderImage
}
