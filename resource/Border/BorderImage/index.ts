import mainfest from './mainfest.json'

export default {
  component: () => import('./BorderImage.vue'),
  config: () => import('./config'),
  mainfest
}
