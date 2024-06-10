import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./src/StereoscopicBarChart.vue'),
  manifest
}
