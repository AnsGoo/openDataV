import manifest from './manifest.json'
import { defineAsyncComponent } from 'vue'

export default {
  component: () => import('./Gauge.vue'),
  manifest
}
