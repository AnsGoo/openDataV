import mainfest from './mainfest.json'

export default {
  component: () => import('./BasicBarChart.vue'),
  config: () => import('./config'),
  mainfest
}
