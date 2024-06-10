import manifest from './manifest.json'

export default {
  config: () => import('./config'),
  component: () => import('./SubText.vue'),
  manifest
}
