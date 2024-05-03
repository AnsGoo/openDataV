import mainfest from './mainfest.json'

export default {
  config: () => import('./config'),
  component: () => import('./ScrollTable.vue'),
  mainfest
}
