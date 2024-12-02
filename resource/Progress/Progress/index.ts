import ProgressComponent from './config'
import manifest from './manifest.json'

export default {
  component: () => import('./Progress.vue'),
  config: ProgressComponent,
  manifest
}
