import ProgressComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./WaveChart.vue'),
  config: ProgressComponent
}
