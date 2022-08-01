<template>
  <n-collapse accordion>
    <n-collapse-item
      v-for="(item, index) in arrayData"
      :key="`${ukey}${index}`"
      :name="max > 1 ? `${uid}${index}` : uid"
    >
      <template #header>
        <div class="title">{{ name }}{{ index + 1 }}</div>
      </template>
      <template #header-extra>
        <icon-park name="delete-one" size="24" @click="deleteItem(index)" />
      </template>
      <FormItem :children="children" :data="item" :ukey="ukey" @change="changed" # />
    </n-collapse-item>
  </n-collapse>
  <n-button v-show="isShowAdd" class="add" @click="handleAddClick">+</n-button>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { AttrType } from '@/types/component'
import FormItem from './FormItem.vue'

import { NCollapseItem, NButton, NCollapse } from 'naive-ui'

const props = defineProps<{
  data: Recordable<any>[]
  children: AttrType[]
  name: string
  uid: string
  max: number
  ukey: string
}>()

const emits = defineEmits<{
  (e: 'change', value: any, key: string): void
}>()

const arrayData = ref<Recordable<any>[]>(props.data)

const changed = () => {
  emits('change', arrayData.value, props.uid)
}

const isShowAdd = computed<boolean>(() => {
  return arrayData.value.length < props.max
})

const deleteItem = (index: number) => {
  arrayData.value.splice(index, 1)
  emits('change', arrayData.value, props.uid)
}

const handleAddClick = () => {
  const idx = arrayData.value.length
  const child: Recordable<any> = {}
  props.children.map((item) => {
    if (idx > 0) {
      child[item.key] = arrayData.value[idx - 1][item.key]
    } else {
      child[item.key] = undefined
    }
  })
  arrayData.value.push(child)
  emits('change', arrayData.value, props.uid)
}
</script>

<style lang="less" scoped>
.add {
  border-style: dashed;
  width: 100%;
}
</style>
