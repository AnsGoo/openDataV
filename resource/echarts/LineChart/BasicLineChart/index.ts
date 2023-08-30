import BasicLineChartComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./BasicLineChart.vue'),
  config: BasicLineChartComponent
}
