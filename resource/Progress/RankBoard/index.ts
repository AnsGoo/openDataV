import RankBoardComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./RankBoard.vue'),
  config: RankBoardComponent
}
