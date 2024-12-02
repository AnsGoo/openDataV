import manifest from './manifest.json'

export default {
  component: () => import('./BasicLineChart.vue'),
  config: () => import('./config'),
  manifest
}
