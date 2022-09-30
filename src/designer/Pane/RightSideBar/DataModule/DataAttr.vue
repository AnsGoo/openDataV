<template>
  <div class="data-list" style="height: calc(100vh - 120px)">
    <n-form @submit.prevent>
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
      <!-- <n-form-item key="algorithm" label="算法">
        <n-select
          v-model="algorithm"
          placeholder="请选择数据处理算法"
          @change="algorithmChanged($event)"
        >
          <n-option
            v-for="item in algorithmOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </n-select>
      </n-form-item> -->
    </n-form>
  </div>
</template>
<script lang="ts" setup>
import { BaseComponent, DataProtocol, DataType } from '@/resource/models'
import { NForm, NFormItem, NSelect } from 'naive-ui'
import StaticData from './StaticData'
import DynamicData from './DynamicData'
import { reactive, ref } from 'vue'
import { ScriptType } from '@/components/ScriptsEditor/eunm'
import { makeFunction } from '@/utils/data'
import { RequestMethod } from '@/ApiView/RequestContent/requestEnums'
import { uuid } from '@/utils/utils'

const props = defineProps<{
  curComponent: BaseComponent
}>()

const dataType = ref<string>('Static')
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
    const data = {
      originData: JSON.stringify(props.curComponent.exampleData, null, '\t'),
      afterData: '',
      protocol: DataProtocol.JSON,
      script: {
        code: 'return resp.filter(el => el.value > 50)',
        type: ScriptType.Javascript
      }
    }
    const callback = makeFunction(data.script.type, data.script.code, ['resp', 'options'])
    props.curComponent.changeRequestDataConfig(DataType.STATIC, {
      data: data.originData,
      protocol: DataProtocol.JSON,
      callback: callback
    })
  } else if (type === DataType.REST) {
    const restOptions = {
      method: RequestMethod.GET,
      url: '/getNoSymptom',
      headers: [{ key: '', value: '', disable: false, id: uuid() }],
      params: [{ key: '', value: '', disable: false, id: uuid() }],
      data: [{ key: '', value: '', disable: false, id: uuid() }],
      afterScript: {
        code: 'return resp.filter(el => el.value > 50)',
        type: ScriptType.Javascript
      }
    }
    props.curComponent.changeRequestDataConfig(DataType.REST, {
      options: restOptions,
      otherConfig: {
        isRepeat: true,
        interval: 200
      }
    })
  }
}
</script>
<style lang="less">
.data-list {
  @apply overflow-auto p-1 pt-0 h-full;
  margin-right: 10px;
  backdrop-filter: blur(50px);
}
</style>
