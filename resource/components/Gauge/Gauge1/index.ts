import GaugeComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./Gauge.vue'),
  config: GaugeComponent
}
