import mainfest from './mainfest.json'

export default {
  component: () => import('./WaveChart.vue'),
  config: () => import('./config'),
  mainfest
}
