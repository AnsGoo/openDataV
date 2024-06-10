import manifest from './manifest.json'

export default {
  component: () => import('./BorderBox.vue'),
  panel: () => import('./panel'),
  manifest
}
