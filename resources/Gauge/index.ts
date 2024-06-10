import manifest from './manifest.json'

export default {
  component: () => import('./Gauge.vue'),
  panel: () => import('./panel'),
  manifest
}
