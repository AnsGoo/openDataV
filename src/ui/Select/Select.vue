<template>
  <select-down
    v-bind="$props"
    ref="selectDownEl"
    before-change=""
    options=""
    optionskey=""
    :value="showLabel"
    :clearable="clearable"
    @clear="clearClick"
    @delete="deleteClick"
    @input="inputChange"
    @blur="inputBlur"
    @toggle-click="toggleClick"
    @keyup-enter="keyupEnter"
  >
    <ul :class="`o-select`">
      <li
        v-for="(item, index) in optionsList"
        v-show="!item._disabled"
        :key="index"
        :class="{
          disabled: item.disabled,
          active: getActive(item),
          [item.class]: item.class
        }"
        :title="item[optionsKey.label]"
        @click="itemClick(item, $event)"
        v-html="getItemText(item[optionsKey.label])"
      ></li>
      <p v-if="optionsList.length === 0" class="select-empty-options">
        {{ emptyText }}
      </p>
    </ul>
    <slot></slot>
  </select-down>
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'

import SelectDown from './SelectDown.vue'

const props = withDefaults(
  defineProps<{
    value?: any
    //width?: string
    multiple?: boolean
    //collapseTags?: boolean
    //clear?: boolean
    filterable?: boolean
    //size?: string // 尺寸
    //placeholder?: string
    //disabled?: boolean
    //appendToBody?: boolean
    downHeight?: number // 显示下拉最大高度，超出显示滚动条
    //icon?: string
    //fixedIcon?: boolean
    multipleLimit?: number
    options?: Array<any>
    optionsKey?: { label: string; value: string }
    beforeChange?: Function
    async?: boolean
    emptyText?: string
    allowCreate?: boolean // 允许创建
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    options: () => [],
    optionsKey: () => {
      return { label: 'label', value: 'value' }
    },
    downHeight: 200,
    emptyText: '无数据',
    placeholder: '',
    clearable: false
  }
)
const emits = defineEmits<{
  (e: 'update:value', value: any): void
  (e: 'updateValue', value: any): void
  (e: 'change', value: any, obj: any): void
  (e: 'limitChange', value: any): void
  (e: 'clear'): void
  (e: 'delete', value?: number): void
  (e: 'input', value: string): void
  (e: 'focus', value: string): void
  (e: 'blur', value: string): void
  (e: 'toggleClick', value: boolean): void
}>()

interface StateType {
  checked: any
  keywords: string
  setFirst: boolean
  tempChecked: string
}

interface FormControlOption {
  [key: string]: any
  label: string
  value: [string | number]
  disabled?: boolean
  _disabled?: boolean
}

const selectDownEl = ref()
const state = reactive<StateType>({
  checked: [], // 所有已选择的集合
  keywords: '',
  setFirst: false, // 手动选择改变选项时，在watch时不触发setFirstText事件
  tempChecked: ''
})
// 下拉的数据，存在options插槽里面插入的数据
const optionsList: FormControlOption = ref(JSON.parse(JSON.stringify(props.options)))
watch(
  () => props.value,
  () => {
    setFirstText()
  }
)
watch(
  () => props.options,
  () => {
    optionsList.value = JSON.parse(JSON.stringify(props.options))
    setFirstText()
  },
  {
    deep: true
  }
)
const { optionsKey } = toRefs(props)
const optLabel = optionsKey.value.label
const optValue = optionsKey.value.value
const inputBlur = (value: any) => {
  // 搜索输入框失焦时，判断输入的值是否符合
  if (!props.filterable) {
    return
  }
  const filter: any = optionsList.value.filter((item: any) => {
    return item[optLabel] === value && !item.disabled
  })
  if (filter.length > 0) {
    // 输入框符合要求，检查下当前项是不是已选择
    let hasItem = false
    state.checked.forEach((item: any) => {
      if (item[optLabel] === filter[0][optLabel]) {
        hasItem = true
      }
    })
    if (!hasItem) {
      // 没有时添加
      state.checked.push(filter[0])
      emitCom(filter[0])
    }
  }
  // 恢复输入框的值，存在输入后不点击下拉的情况
  selectDownEl.value.setValue(showLabel.value)
  // 还原下拉数据
  state.keywords = ''
  setTimeout(() => {
    optionsList.value.forEach((item: any) => {
      delete item._disabled
    })
  }, 500)
  emits('blur', value)
}
const inputChange = (value: any) => {
  // 默认情况下仅对当前下拉数据进行筛选
  if (!props.filterable) {
    return
  }
  state.keywords = value
  if (!props.async) {
    // 从当前下拉列表筛选
    optionsList.value.forEach((item: any) => {
      item._disabled = item[optLabel].indexOf(value) === -1
    })
  }
  state.setFirst = true
  emits('input', value)
}
// 设置初始值
const setFirstText = () => {
  // console.log('setFirstText')
  if (state.setFirst) {
    return
  }
  state.setFirst = false
  if (props.value && optionsList.value && optionsList.value.length > 0) {
    state.checked = []
    if (typeof props.value === 'object') {
      props.value.forEach((val: string) => {
        state.checked.push({
          [optLabel]: val,
          [optValue]: val
        })
      })
    } else {
      state.checked.push({
        [optLabel]: props.value,
        [optValue]: props.value
      })
    }
    for (let i = 0; i < optionsList.value.length; i++) {
      const item = optionsList.value[i]
      const value = getValueLabel(item)
      if (props.multiple) {
        // 多选
        if (typeof props.value === 'object') {
          const index = props.value.indexOf(value)
          if (index !== -1) {
            state.checked.splice(index, 1, item)
          }
        }
      } else {
        // 单选
        //state.checked = []
        if (value === props.value) {
          state.checked.splice(0, 1, item) // 没有label时直接取value
          break
        }
      }
    }
  }
}
const getActive = (item: FormControlOption) => {
  const val = getValueLabel(item)
  if (props.multiple) {
    if (typeof props.value === 'object') {
      return props.value.indexOf(val) !== -1
    }
  } else {
    return val === props.value
  }
}
const getValueLabel = (obj: any) => {
  return obj[optValue] === undefined ? obj[optLabel] : obj[optValue]
}
const itemClick = (item: FormControlOption, evt: MouseEvent) => {
  if (!item.disabled) {
    if (props.beforeChange && !props.beforeChange(item)) {
      slideUp()
      evt && evt.stopPropagation()
      return
    }
    const activeValue = getValueLabel(item) as string
    if (props.multiple) {
      // 多选
      if (
        props.multipleLimit &&
        props.multipleLimit > 0 &&
        props.multipleLimit <= state.checked.length
      ) {
        emits('limitChange', props.value)
        return false
      }
      let hasItem = -1
      state.checked.forEach((ch: any, index: number) => {
        const val = getValueLabel(ch) as string
        if (val === activeValue) {
          // 当前选项已选上，则取消选择
          hasItem = index
        }
      })
      if (hasItem !== -1) {
        state.checked.splice(hasItem, 1)
      } else {
        state.checked.push(item)
      }
      emitCom(item)
    } else {
      // 单选
      state.checked = [item]
      slideUp() // 收起下拉
      emitCom(item)
    }
    // 判断有没通过点击删除
  }
  evt && evt.stopPropagation()
}
const toggleClick = (val: boolean) => {
  if (props.multiple && typeof props.value === 'object') {
    if (val) {
      state.tempChecked = JSON.stringify(props.value)
    } else {
      // 收起时判断当前所选值是否都包含了展开时的值
      const tempChecked = JSON.parse(state.tempChecked)
      let isDel = true
      console.log(JSON.stringify(props.value))
      tempChecked.forEach((item: string) => {
        if ((props.value as any).indexOf(item) === -1) {
          isDel = false // 有删除
        }
      })
      if (!isDel) {
        emits('delete', -1)
      }
    }
  }
  emits('toggleClick', val)
}
const slideUp = () => {
  selectDownEl.value.slideUp()
}
const controlChange: any = inject(`OControlChange`, '')
const emitCom = (item?: any, update = true) => {
  state.setFirst = update
  let val: any = []
  state.checked.forEach((obj: FormControlOption) => {
    val.push(getValueLabel(obj))
  })
  if (!props.multiple) {
    val = val[0] || ''
  }
  emits('update:value', val)
  emits('updateValue', val)
  controlChange && controlChange(val)
  emits('change', val, item) // 改变事件
}
const getItemText = (label: string): string => {
  if (state.keywords && props.filterable) {
    const reg = new RegExp(`${state.keywords}`, 'gi')
    // return label.replace(//gi,)
    return label.replace(reg, '<b>' + '$&' + '</b>')
  } else {
    return label
  }
}
// 选中的文本值
const showLabel = computed(() => {
  return state.checked.map((item: any) => item[optLabel])
})
// 清空事件
const clearClick = () => {
  state.checked = []
  emitCom()
  emits('clear')
}
// 删除选项事件
const deleteClick = (index: number) => {
  state.checked.splice(index, 1)
  emitCom()
  emits('delete', index)
}
provide(`OGetChildOption`, (item: any) => {
  optionsList.value.push(item)
})
// 输入框回车事件
const keyupEnter = (val: string) => {
  if (!props.allowCreate) {
    return false
  }
  const filter = optionsList.value.filter((item: any) => item[optLabel].includes(val))
  if (filter && filter.length > 0) {
    // 存时，则选中第一项
    // @ts-ignore
    itemClick(filter[0] as any, '')
  } else {
    // 添加一向到options，并更新modelValue
    const newObj: any = {
      [optLabel]: val,
      [optValue]: val
    }
    state.checked = [val]
    optionsList.value.push(newObj)
    emitCom(newObj)
  }
}

onMounted(() => {
  setFirstText()
})

defineExpose({ slideUp })
</script>
<style lang="less" scoped>
@import 'select.less';
</style>
