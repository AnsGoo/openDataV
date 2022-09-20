import ScrollTableComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./ScrollTable.vue'),
  config: ScrollTableComponent,
  form: () => import('./Form.vue'),
  formName: 'ScrollTableForm'
}
