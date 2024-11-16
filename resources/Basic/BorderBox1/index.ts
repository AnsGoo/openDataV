import { defineAsyncComponent } from 'vue'

import manifest from './manifest.json'

export default {
  component: () => import('./BorderBox.vue'),
  attrs: defineAsyncComponent(() => import('./attr-panel')),
  manifest
}
