import DateTextComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./DateText.vue'),
  config: DateTextComponent
}
