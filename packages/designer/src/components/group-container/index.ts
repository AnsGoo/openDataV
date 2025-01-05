import { defineAsyncComponent } from 'vue'

import manifest from './manifest.json'

export default {
  component: defineAsyncComponent(() => import('./container.vue')),
  panel: defineAsyncComponent(() => import('./attr-panel')),
  manifest
}
