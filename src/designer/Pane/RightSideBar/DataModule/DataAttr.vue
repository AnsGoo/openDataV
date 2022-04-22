<template>
  <div class="data-list" style="height: calc(100vh - 120px)">
    <el-form size="mini" @submit.prevent>
      <el-form-item key="dataType" label="数据类型">
        <el-select
          v-model="dataType"
          placeholder="请选择数据处理算法"
          @change="typeChanged($event)"
        >
          <el-option
            v-for="item in dataTypeOptions"
            :label="item.name"
            :value="item.value"
            :key="item.value"
          />
        </el-select>
      </el-form-item>
      <StaticData v-if="dataType === 'Static'" />
      <RealTimeData v-else-if="dataType === 'RealTime'" />
      <DynamicData v-else-if="dataType === 'Dynamic'" />
      <el-form-item key="algorithm" label="算法">
        <el-select
          v-model="algorithm"
          placeholder="请选择数据处理算法"
          @change="algorithmChanged($event)"
        >
          <el-option
            v-for="item in algorithmOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ElForm, ElFormItem, ElSelect, ElOption } from 'element-plus'
import StaticData from './StaticData.vue'
import DynamicData from './DynamicData.vue'
import RealTimeData from './RealTimeData.vue'
import { reactive, ref } from 'vue'

const dataType = ref<string>('Static')
const algorithm = ref<number>()
const dataTypeOptions = reactive([
  {
    name: '静态数据',
    value: 'Static'
  },
  {
    name: '实时数据',
    value: 'RealTime'
  },
  {
    name: '动态数据',
    value: 'Dynamic'
  }
])
const algorithmOptions = ref<{ label: string; id: number }[]>([])

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
