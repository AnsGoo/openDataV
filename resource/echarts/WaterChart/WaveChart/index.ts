import manifest from './manifest.json'

export default {
  component: () => import('./WaveChart.vue'),
  config: () => import('./config'),
  manifest
}
