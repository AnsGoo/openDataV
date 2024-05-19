import mainfest from './mainfest.json'

export default {
  component: () => import('./src/MapChart.vue'),
  config: () => import('./config'),
  mainfest
}
