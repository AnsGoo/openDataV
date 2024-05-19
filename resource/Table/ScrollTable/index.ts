import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./ScrollTable.vue'),
  manifest
}
