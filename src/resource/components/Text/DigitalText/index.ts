import DigitalTextComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./DigitalText.vue'),
  config: DigitalTextComponent
}
