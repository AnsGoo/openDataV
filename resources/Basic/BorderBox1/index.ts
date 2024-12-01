import { defineAsyncComponent } from 'vue'

import manifest from './manifest.json'

export default {
  component: () => import('./BorderBox.vue'),
  panel: defineAsyncComponent(() => import('./attr-panel')),
  manifest
}
