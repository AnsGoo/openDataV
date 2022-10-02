<template>
  <div class="data-list" style="height: calc(100vh - 120px)">
    <n-form
      @submit.prevent
      v-if="curComponent.dataIntegrationMode === DataIntegrationMode.UNIVERSAL"
    >
      <n-form-item key="dataType" label="数据类型">
        <n-select
          v-model:value="dataType"
          placeholder="请选择数据类型"
          @update:value="typeChanged"
          :options="dataTypeOptions"
        />
      </n-form-item>
      <StaticData v-if="dataType === DataType.STATIC" :curComponent="curComponent" />
      <!-- <RealTimeData v-else-if="dataType === 'RealTime'" /> -->
      <DynamicData v-else-if="dataType === DataType.REST" :curComponent="curComponent" />
    </n-form>
    <n-descriptions v-else class="placeholder">
      <n-descriptions-item>
        <n-empty description="未发现数据配置项" />
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>
<script lang="ts" setup>
import { BaseComponent, DataType } from '@/resource/models'
import { NForm, NFormItem, NSelect, NDescriptions, NDescriptionsItem, NEmpty } from 'naive-ui'
import StaticData from './StaticData'
import DynamicData from './DynamicData'
import { onMounted, reactive, ref, watch } from 'vue'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import { RequestMethod } from '@/ApiView/RequestContent/requestEnums'
import { uuid } from '@/utils/utils'
import { cloneDeep } from 'lodash-es'
import { DataIntegrationMode } from '@/resource/models/data'
import { requestOptionsToStore } from '@/ApiView/hooks/http/utils'
import { RequestOption } from '@/ApiView/hooks/http/type'

const props = defineProps<{
  curComponent: BaseComponent
}>()

const dataType = ref<string>(DataType.STATIC)
const dataTypeOptions = reactive([
  {
    label: '静态数据',
    value: DataType.STATIC
  },
  {
    label: '动态数据',
    value: DataType.REST
  },
  {
    label: '实时数据',
    value: DataType.REALTIME
  }
])

const typeChanged = (type: string) => {
  if (type === DataType.STATIC) {
    const exampleData = props.curComponent.exampleData
    props.curComponent.changeRequestDataConfig(DataType.STATIC, {
      data: cloneDeep(exampleData.data),
      protocol: exampleData.protocol,
      script: exampleData.script
    })
  } else if (type === DataType.REST) {
    const restOptions: RequestOption = {
      method: RequestMethod.GET,
      url: '/getNoSymptom',
      headers: [{ key: '', value: '', disable: false, id: uuid() }],
      params: [{ key: '', value: '', disable: false, id: uuid() }],
      data: [{ key: '', value: '', disable: false, id: uuid() }],
      afterScript: {
        code: '',
        type: ScriptType.Javascript
      }
    }
    props.curComponent.changeRequestDataConfig(DataType.REST, {
      options: requestOptionsToStore(restOptions),
      otherConfig: {
        isRepeat: true,
        interval: 300
      }
    })
  }
}

onMounted(() => {
  const dataConfig = props.curComponent.dataConfig
  if (dataConfig) {
    dataType.value = dataConfig.type
  }
})

watch(
  () => props.curComponent,
  (value: BaseComponent) => {
    if (value) {
      const dataConfig = props.curComponent.dataConfig
      if (dataConfig) {
        dataType.value = dataConfig.type
      }
    }
  }
)
</script>
<style lang="less">
.data-list {
  @apply overflow-auto p-1 pt-0 h-full;
  margin-right: 10px;
  backdrop-filter: blur(50px);
}
</style>
