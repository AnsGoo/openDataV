import StereoscopicBarChartComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./src/StereoscopicBarChart.vue'),
  config: StereoscopicBarChartComponent
}
