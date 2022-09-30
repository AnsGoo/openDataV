<template>
  <div class="data-list" style="height: calc(100vh - 120px)">
    <n-form @submit.prevent>
      <n-form-item key="dataType" label="数据类型">
        <n-select
          v-model:value="dataType"
          placeholder="请选择数据处理算法"
          @update:value="typeChanged($event)"
          :options="dataTypeOptions"
        />
      </n-form-item>
      <StaticData v-if="dataType === 'Static'" :curComponent="curComponent" />
      <!-- <RealTimeData v-else-if="dataType === 'RealTime'" /> -->
      <DynamicData v-else-if="dataType === 'Dynamic'" :curComponent="curComponent" />
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
import { BaseComponent } from '@/resource/models'
import { NForm, NFormItem, NSelect } from 'naive-ui'
import StaticData from './StaticData'
import DynamicData from './DynamicData'
import { reactive, ref } from 'vue'
defineProps<{
  curComponent: BaseComponent
}>()

// import RealTimeData from './RealTimeData.vue'

const dataType = ref<string>('Static')
// const algorithm = ref<number>()
const dataTypeOptions = reactive([
  {
    label: '静态数据',
    value: 'Static'
  },
  {
    label: '动态数据',
    value: 'Dynamic'
  },
  {
    label: '实时数据',
    value: 'RealTime'
  }
])
// const algorithmOptions = ref<{ label: string; id: number }[]>([])

// const algorithmChanged = (algorithm: number) => {
//   console.log(algorithm)
// }
const typeChanged = (type: string) => {
  console.log(type)
}
</script>
<style lang="less">
.data-list {
  @apply overflow-auto p-1 pt-0 h-full;
  margin-right: 10px;
  backdrop-filter: blur(50px);
}
</style>
