import manifest from './manifest.json'

export default {
  component: () => import('./Image.vue'),
  panel: () => import('./panel'),
  manifest
}
