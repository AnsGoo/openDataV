import FlvVideo, { componentName } from './config'

export default {
  componentName,
  component: () => import('./FlvVideo.vue'),
  config: FlvVideo
}
