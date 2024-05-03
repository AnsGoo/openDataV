import ProgressComponent from './config'
import mainfest from './mainfest.json'

export default {
  component: () => import('./Progress.vue'),
  config: ProgressComponent,
  mainfest
}
