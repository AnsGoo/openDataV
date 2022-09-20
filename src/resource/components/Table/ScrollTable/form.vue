<template>
  <n-data-table size="small" :bordered="false" :columns="columns" :data="showData" />
</template>

<script lang="ts" setup>
import { reactive, h, computed } from 'vue'
import { NDataTable, DataTableColumns } from 'naive-ui'
import { TableColumnData } from './type'
import { NInput, NSelect, SelectOption } from 'naive-ui'
import { IconPark } from '@/plugins/icon'

const props = defineProps<{
  value: TableColumnData[]
  args: any
}>()

const emits = defineEmits<{
  (e: 'change', value: TableColumnData[])
}>()

const data = reactive<TableColumnData[]>(props.value)
const empty: TableColumnData = {
  name: '',
  width: '',
  align: 'center'
}

const showData = computed<TableColumnData[]>(() => {
  return [...props.value, empty]
})

const showIcon = (row) => {
  if (row.width || row.name) {
    return 'delete-one'
  }
  return 'add-three'
}

const options: SelectOption[] = [
  {
    label: '左',
    value: 'left'
  },
  {
    label: '右',
    value: 'right'
  },
  {
    label: '中',
    value: 'center'
  }
]

// 修改数据
const changeData = (index: number, key: string, value: string) => {
  if (index === data.length) {
    data.push({
      name: '',
      width: '',
      align: 'center'
    })
  }
  data[index][key] = value

  emits('change', data)
}

const columns = reactive<DataTableColumns>([
  {
    title: '列名',
    key: 'name',
    render(row, index: number) {
      return h(NInput, {
        value: row.name,
        onUpdateValue(v) {
          changeData(index, 'name', v)
        }
      })
    }
  },
  {
    title: '宽度',
    key: 'width',
    render(row, index: number) {
      return h(NInput, {
        value: row.width,
        onUpdateValue(v) {
          changeData(index, 'width', v)
        }
      })
    }
  },
  {
    title: '对齐',
    key: 'align',
    render(row, index) {
      return h(NSelect, {
        value: row.align,
        options: options,
        onUpdateValue(v) {
          changeData(index, 'align', v)
        }
      })
    }
  },
  {
    key: 'actions',
    width: '10',
    render(row, index) {
      return h(IconPark, {
        name: showIcon(row),
        color: 'red',
        onClick() {
          if (data.length !== index) {
            data.splice(index, 1)
          } else {
            data.push({
              name: '',
              width: '',
              align: 'center'
            })
          }
        }
      })
    }
  }
])
</script>

<style lang="less" scoped></style>
