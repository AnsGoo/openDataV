import ProgressComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./Progress.vue'),
  config: ProgressComponent
}
