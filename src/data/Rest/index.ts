import { shallowRef } from 'vue'

import RestDataPlugin from '@/apiView/DynamicData'

import DataView from './View.vue'

RestDataPlugin.component = shallowRef(DataView)

export default RestDataPlugin
