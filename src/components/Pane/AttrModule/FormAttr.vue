<template>
  <el-collapse-item :title="name" :name="uid">
    <FormItem :children="children" :data="formData" :ukey="ukey" @change="changed" />
  </el-collapse-item>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { AttrType } from '@/types/component'
import FormItem from './FormItem.vue'
import { ElCollapseItem } from 'element-plus'

const props = defineProps<{
  data: Recordable
  children: AttrType[]
  name: string
  uid: string
  ukey: string
}>()

const emits = defineEmits<{ (e: 'change', value: any, key: string): void }>()
const formData = reactive<Recordable>(props.data)

const changed = (val: string | string[] | Event, key: string) => {
  emits('change', val, key)
}
</script>
