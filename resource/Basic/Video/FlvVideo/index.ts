import mainfest from './mainfest.json'

export default {
  component: () => import('./FlvVideo.vue'),
  config: () => import('./config'),
  mainfest
}
