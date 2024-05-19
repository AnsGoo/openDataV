import mainfest from './mainfest.json'

export default {
  config: () => import('./config'),
  component: () => import('./BorderBox.vue'),
  mainfest
}
