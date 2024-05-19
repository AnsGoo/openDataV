import mainfest from './mainfest.json'

export default {
  component: () => import('./BorderBox.vue'),
  panel: () => import('./panel'),
  mainfest
}
