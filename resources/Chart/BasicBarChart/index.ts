import manifest from './manifest.json'

export default {
  component: () => import('./BasicBarChart.vue'),
  panel: () => import('./panel'),
  manifest
}
