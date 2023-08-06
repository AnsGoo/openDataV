import SubTextComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./SubText.vue'),
  config: SubTextComponent
}
