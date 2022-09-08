import BasicBarChartComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./BasicBarChart.vue'),
  config: BasicBarChartComponent
}
