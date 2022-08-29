import StaticTextComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./StaticText.vue'),
  config: StaticTextComponent
}
