import mainfest from './mainfest.json'

export default {
  component: () => import('./BorderBox.vue'),
  config: () => import('./config'),
  mainfest
}
