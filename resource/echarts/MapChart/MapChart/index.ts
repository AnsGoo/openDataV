import MapChartComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./src/MapChart.vue'),
  config: MapChartComponent
}
