<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script lang="ts" setup>
import { reactive, h } from 'vue'
import { NDataTable, DataTableColumns, PaginationProps } from 'naive-ui'
import ShowOrEdit from './components/ShowOrEdit'
import { TableColumnData } from './type'

const props = defineProps<{
  value: TableColumnData[]
}>()

const emits = defineEmits<{
  (e: 'change', value: TableColumnData[])
}>()

const pagination: PaginationProps = {
  pageSize: 5
}
console.log(props.value)
const data: TableColumnData[] = props.value
const columns = reactive<DataTableColumns>([
  {
    title: '列名',
    key: 'name',
    render(row, index: number) {
      return h(ShowOrEdit, {
        value: row.name,
        onUpdateValue(v) {
          data[index].name = v
          emits('change', data)
        }
      })
    }
  },
  {
    title: '宽度',
    key: 'width',
    render(row, index: number) {
      return h(ShowOrEdit, {
        value: row.width,
        onUpdateValue(v) {
          data[index].width = v
          emits('change', data)
        }
      })
    }
  },
  {
    title: '对齐',
    key: 'align',
    render(row, index) {
      return h(ShowOrEdit, {
        value: row.align,
        onUpdateValue(v) {
          data[index].align = v
          emits('change', data)
        }
      })
    }
  }
])
</script>

<style lang="less" scoped></style>
