import mainfest from './mainfest.json'

export default {
  component: () => import('./BasicLineChart.vue'),
  config: () => import('./config'),
  mainfest
}
