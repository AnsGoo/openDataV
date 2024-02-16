import GroupComponent, { componentName } from './config'

export default {
  componentName,
  component: () => import('./Group.vue'),
  config: GroupComponent
}
