import { defineAsyncComponent } from 'vue'

import manifest from './manifest.json'

export default {
  panel: defineAsyncComponent(() => import('./panel')),
  component: () => import('./SubText.vue'),
  manifest
}
