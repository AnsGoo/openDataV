import { defineAsyncComponent } from 'vue'

import manifest from './manifest.json'

export default {
  component: defineAsyncComponent(() => import('./Group.vue')),
  attrs: defineAsyncComponent(() => import('./attr-panel')),
  manifest
}
