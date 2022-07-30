<template>
  <n-collapse-item :title="name" :name="uid">
    <FormItem :children="children" :data="formData" :ukey="ukey" @change="changed" />
  </n-collapse-item>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { AttrType } from '@/types/component'
import FormItem from './FormItem.vue'
import { NCollapseItem } from 'naive-ui'

const props = defineProps<{
  data: Recordable
  children: AttrType[]
  name: string
  uid: string
  ukey: string
}>()

const emits = defineEmits<{ (e: 'change', key: string, value: any): void }>()
const formData = reactive<Recordable>(props.data)

const changed = (val: any, key: string) => {
  emits('change', key, val)
}
</script>
