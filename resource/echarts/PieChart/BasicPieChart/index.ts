import BasicPieChartComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./BasicPieChart.vue'),
  config: BasicPieChartComponent
}
