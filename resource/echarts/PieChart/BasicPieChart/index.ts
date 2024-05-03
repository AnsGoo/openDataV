import mainfest from './mainfest.json'

export default {
  component: () => import('./BasicPieChart.vue'),
  config: () => import('./config'),
  mainfest
}
