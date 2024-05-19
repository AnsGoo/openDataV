import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./Decoration.vue'),
  manifest
}
