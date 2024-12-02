import manifest from './manifest.json'

export default {
  manifest,
  component: () => import('./ComChart.vue'),
  config: () => import('./config')
}
