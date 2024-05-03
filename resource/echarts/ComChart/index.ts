import mainfest from './mainfest.json'

export default {
  mainfest,
  component: () => import('./ComChart.vue'),
  config: () => import('./config')
}
