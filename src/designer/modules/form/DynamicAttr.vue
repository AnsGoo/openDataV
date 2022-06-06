<template>
  <el-collapse-item :key="ukey" :title="name">
    <el-collapse accordion>
      <el-collapse-item
        v-for="(item, index) in arrayData"
        :key="`${ukey}${index}`"
        :name="max > 1 ? `${uid}${index}` : uid"
      >
        <template #title>
          <div class="dynamic">
            <div class="title">{{ max > 1 ? `${index + 1}` : name }}</div>
            <div class="delete">
              <el-icon style="vertical-align: middle">
                <icon-delete-one
                  theme="outline"
                  size="24"
                  fill="var(--el-color-primary)"
                  @click="deleteItem(index)"
                />
              </el-icon>
            </div>
          </div>
        </template>
        <FormItem :children="children" :data="item" :ukey="ukey" @change="changed" />
      </el-collapse-item>
    </el-collapse>
    <el-button v-show="isShowAdd" class="add" @click="handleAddClick">+</el-button>
  </el-collapse-item>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { AttrType } from '@/types/component'
import FormItem from './FormItem.vue'
import { ElButton, ElCollapseItem, ElIcon, ElCollapse } from 'element-plus'

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

.dynamic {
  display: flex;
  width: 100%;
  // justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: row;

  .delete {
    color: #ef4444;
  }
}
</style>
