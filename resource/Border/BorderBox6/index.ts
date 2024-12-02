import manifest from './manifest.json'

export default {
  component: () => import('./BorderBox.vue'),
  config: () => import('./config'),
  manifest
}
