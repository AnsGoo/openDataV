import mainfest from './mainfest.json'

export default {
  config: () => import('./config'),
  component: () => import('./src/StereoscopicBarChart.vue'),
  mainfest
}
