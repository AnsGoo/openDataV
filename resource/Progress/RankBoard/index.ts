import mainfest from './mainfest.json'

export default {
  component: () => import('./RankBoard.vue'),
  config: () => import('./config'),
  mainfest
}
