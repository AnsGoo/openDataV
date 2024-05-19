import mainfest from './mainfest.json'

export default {
  component: () => import('./Gauge.vue'),
  panel: () => import('./panel'),
  mainfest
}
