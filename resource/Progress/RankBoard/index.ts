import manifest from './manifest.json'

export default {
  component: () => import('./RankBoard.vue'),
  config: () => import('./config'),
  manifest
}
