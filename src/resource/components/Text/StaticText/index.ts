import StaticTextComponent, { componentName } from './config'
// import README from './README.md'
import StaticText from './StaticText.vue'

export default {
  componentName,
  component: StaticText,
  config: StaticTextComponent,
  docs: () => import('./README.md')
}
