import { defineAsyncComponent } from 'vue'

import GroupComponent from './config'
import manifest from './manifest.json'

export default {
  component: defineAsyncComponent(() => import('./Group.vue')),
  attrs: defineAsyncComponent(() => import('./attr-panel')),
  GroupComponent,
  manifest
}
