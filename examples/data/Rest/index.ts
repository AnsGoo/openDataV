import RestDataPlugin from 'open-data-v/apiView/rest'
import { shallowRef } from 'vue'

import DataView from './View.vue'

RestDataPlugin.component = shallowRef(DataView)

export default RestDataPlugin
