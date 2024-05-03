import mainfest from './mainfest.json'

export default {
  config: () => import('./config'),
  component: () => import('./StaticText.vue'),
  mainfest
}
