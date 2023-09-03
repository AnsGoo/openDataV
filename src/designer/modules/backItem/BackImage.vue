<template>
  <o-form :model="data" size="small" label-placement="left" :show-label="false">
    <o-form-item label="图片">
      <o-input
        :value="data.backgroundImage"
        placeholder="请输入图片地址"
        @update:value="(val: string) => handleChange(val, 'backgroundImage')"
      />
    </o-form-item>
    <o-form-item label="填充">
      <o-select
        :value="data.backgroundRepeat"
        :options="repeatOptions"
        @update:value="(val:string) => handleChange(val, 'backgroundRepeat')"
      />
    </o-form-item>
    <o-form-item label="附着">
      <o-select
        :value="data.backgroundAttachment"
        :options="attachmentOptions"
        @update:value="(val: string) => handleChange(val, 'backgroundAttachment')"
      />
    </o-form-item>
    <o-form-item label="位置">
      <o-select
        :value="data.backgroundPosition"
        :options="positionOptions"
        @update:value="(val:string) => handleChange(val, 'backgroundPosition')"
      />
    </o-form-item>
    <o-form-item label="尺寸">
      <o-select
        :value="data.backgroundSize"
        :options="sizeOptions"
        @update:value="(val: string) => handleChange(val, 'backgroundSize')"
      />
    </o-form-item>
  </o-form>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { SelectOption } from 'open-data-v/ui'
import { OForm, OFormItem, OInput, OSelect } from 'open-data-v/ui'
import { computed } from 'vue'

import type { BackgroundImage } from './type'

const props = defineProps<{
  value: BackgroundImage
}>()

const emits = defineEmits<{
  (e: 'update:value', value: BackgroundImage)
}>()

const data = computed<BackgroundImage>(() => {
  return {
    backgroundImage: props.value.backgroundImage,
    backgroundRepeat: props.value.backgroundRepeat || 'round',
    backgroundAttachment: props.value.backgroundAttachment || 'local',
    backgroundPosition: props.value.backgroundPosition || 'center',
    backgroundSize: props.value.backgroundSize || 'cover'
  }
})

const repeatOptions: SelectOption[] = [
  {
    label: '横向平铺',
    value: 'repeat-x'
  },
  {
    label: '纵向平铺',
    value: 'repeat-y'
  },
  {
    label: '横向纵向平铺',
    value: 'repeat'
  },
  {
    label: '不平铺',
    value: 'no-repeat'
  },
  {
    label: '自动充满容器',
    value: 'round'
  },
  {
    label: '宽高等比例缩放',
    value: 'space'
  }
]

const attachmentOptions: SelectOption[] = [
  {
    label: '固定位置',
    value: 'fixed'
  },
  {
    label: '不滚动',
    value: 'scroll'
  },
  {
    label: '默认',
    value: 'local'
  }
]

const positionOptions: SelectOption[] = [
  {
    label: '水平垂直居中',
    value: 'center'
  },
  {
    label: '左对齐',
    value: 'left'
  },
  {
    label: '右对齐',
    value: 'right'
  },
  {
    label: '上对齐',
    value: 'top'
  },
  {
    label: '下对齐',
    value: 'bottom'
  }
]

const sizeOptions: SelectOption[] = [
  {
    label: '真实大小',
    value: 'auto'
  },
  {
    label: '等比例缩放',
    value: 'cover'
  },
  {
    label: '单边缩放置容器大小',
    value: 'contain'
  }
]
const handleChange = (value: string, type: string) => {
  const background: BackgroundImage = cloneDeep(data.value)
  switch (type) {
    case 'backgroundImage':
      background.backgroundImage = value
      break
    case 'backgroundAttachment':
      background.backgroundAttachment = value
      break
    case 'backgroundPosition':
      background.backgroundPosition = value
      break
    case 'backgroundRepeat':
      background.backgroundRepeat = value
      break
    case 'backgroundSize':
      background.backgroundSize = value
      break
  }

  emits('update:value', background)
}
</script>

<style lang="less" scoped>
:deep(.n-upload) {
  width: auto;
}

:deep(.n-form-item .n-form-item-feedback-wrapper) {
  --n-feedback-height: 10px;
}
</style>
