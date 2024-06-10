import manifest from './manifest.json'

export default {
  component: () => import('./BorderImage.vue'),
  config: () => import('./config'),
  manifest
}
