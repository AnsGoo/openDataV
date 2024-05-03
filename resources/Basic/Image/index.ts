import mainfest from './mainfest.json'

export default {
  component: () => import('./Image.vue'),
  panel: () => import('./panel'),
  mainfest
}
