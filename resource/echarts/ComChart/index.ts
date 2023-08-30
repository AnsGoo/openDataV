import ComChartComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./ComChart.vue'),
  config: ComChartComponent
}
