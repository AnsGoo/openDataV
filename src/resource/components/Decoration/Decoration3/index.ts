import Decoration, { componentName } from './config'

export default {
  componentName,
  component: () => import('./Decoration.vue'),
  config: Decoration
}
