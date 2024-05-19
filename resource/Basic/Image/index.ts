import mainfest from './mainfest.json'

export default {
  component: () => import('./Image.vue'),
  config: () => import('./config'),
  mainfest
}
