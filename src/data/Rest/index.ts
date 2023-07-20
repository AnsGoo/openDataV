import { shallowRef } from 'vue'

import RestDataPlugin from '@/apiView/rest'

import DataView from './View.vue'

RestDataPlugin.component = shallowRef(DataView)

export default RestDataPlugin
