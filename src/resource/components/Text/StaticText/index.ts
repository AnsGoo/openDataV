import StaticTextComponent, { componentName } from './config'
// import README from './README.md'

export default {
  componentName,
  component: () => import('./StaticText.vue'),
  config: StaticTextComponent,
  docs: () => import('./README.md')
}
