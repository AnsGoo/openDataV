import mainfest from './mainfest.json'

export default {
  component: () => import('./BasicBarChart.vue'),
  panel: () => import('./panel'),
  mainfest
}
