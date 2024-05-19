import manifest from './manifest.json'

export default {
  component: () => import('./BasicPieChart.vue'),
  config: () => import('./config'),
  manifest
}
