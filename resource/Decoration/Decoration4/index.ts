import mainfest from './mainfest.json'

export default {
  config: () => import('./config'),
  component: () => import('./Decoration.vue'),
  mainfest
}
