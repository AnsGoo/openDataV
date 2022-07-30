<template>
  <div class="data-list" style="height: calc(100vh - 120px)">
    <n-form size="small" @submit.prevent label-placement="left" label-align="left">
      <n-form-item key="dataType" label="数据类型">
        <n-select
          v-model:value="dataType"
          placeholder="请选择数据处理算法"
          @update:value="typeChanged($event)"
          :options="dataTypeOptions"
        />
      </n-form-item>
      <StaticData v-if="dataType === 'Static'" />
      <RealTimeData v-else-if="dataType === 'RealTime'" />
      <DynamicData v-else-if="dataType === 'Dynamic'" />
      <n-form-item key="algorithm" label="算法">
        <n-select
          v-model:value="algorithm"
          placeholder="请选择数据处理算法"
          @update:value="algorithmChanged($event)"
          :options="algorithmOptions"
        />
      </n-form-item>
    </n-form>
  </div>
</template>
<script lang="ts" setup>
import { NForm, NFormItem, NSelect } from 'naive-ui'
import StaticData from './StaticData.vue'
import DynamicData from './DynamicData.vue'
import RealTimeData from './RealTimeData.vue'
import { reactive, ref } from 'vue'
import type { SelectOption } from 'naive-ui'

const dataType = ref<string>('Static')
const algorithm = ref<number>()
const dataTypeOptions = reactive<SelectOption[]>([
  {
    label: '静态数据',
    value: 'Static'
  },
  {
    label: '实时数据',
    value: 'RealTime'
  },
  {
    label: '动态数据',
    value: 'Dynamic'
  }
])
const algorithmOptions = ref<{ label: string; value: number }[]>([])

const algorithmChanged = (algorithm: number) => {
  console.log(algorithm)
}
const typeChanged = (type: string) => {
  console.log(type)
}
</script>
<style lang="less">
@layer components {
  .data-list {
    @apply overflow-auto p-1 pt-0 h-full;
    margin-right: 10px;
    backdrop-filter: blur(50px);
  }
}
</style>
