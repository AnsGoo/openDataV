<template>
  <el-collapse-item
    v-for="(item, index) in arrayData"
    :key="`${ukey}${index}`"
    :title="max > 1 ? `${name}${index}` : name"
    :name="max > 1 ? `${uid}${index}` : uid"
  >
    <FormItem :children="children" :data="item" :ukey="ukey" @change="changed" />
  </el-collapse-item>
  <el-button v-show="isShowAdd" class="add" @click="handleAddClick">+</el-button>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import type { AttrType } from '@/types/component'
import FormItem from './FormItem.vue'
import { ElButton, ElCollapseItem } from 'element-plus'

const props = defineProps<{
  data: Recordable<any>[]
  children: AttrType[]
  name: string
  uid: string
  max: number
  ukey: string
}>()

const emits = defineEmits<{ (e: 'change', value: any, key: string): void }>()

const arrayData = ref<Recordable<any>[]>(props.data)

const changed = () => {
  emits('change', arrayData.value, props.uid)
}

const isShowAdd = computed<boolean>(() => {
  return arrayData.value.length < props.max
})

const handleAddClick = () => {
  const idx = arrayData.value.length
  const child: Recordable<any> = {}
  props.children.map((item) => {
    if (idx > 0) {
      child[item.key] = arrayData.value[idx - 1][item.key]
    } else {
      child[item.key] = ''
    }
  })

  arrayData.value.push(child)
}

watch(
  () => props.data,
  () => {
    arrayData.value = props.data
  },
  {
    deep: true
  }
)
</script>

<style lang="less" scoped>
.add {
  border-style: dashed;
  width: 100%;
}
</style>
