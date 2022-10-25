<template>
  <n-form :model="data" size="small" label-placement="left" :show-label="false">
    <n-form-item label="图片">
      <n-input
        :value="data.backgroundImage"
        placeholder="请输入图片地址"
        @update:value="(value) => handleChange(value, 'backgroundImage')"
      />
      <n-upload :custom-request="customRequest" :show-file-list="false">
        <n-button size="small">上传</n-button>
      </n-upload>
    </n-form-item>
    <n-form-item label="填充">
      <n-select
        :value="data.backgroundRepeat"
        :options="repeatOptions"
        @update:value="(value) => handleChange(value, 'backgroundRepeat')"
      />
    </n-form-item>
    <n-form-item label="附着">
      <n-select
        :value="data.backgroundAttachment"
        :options="attachmentOptions"
        @update:value="(value) => handleChange(value, 'backgroundAttachment')"
      />
    </n-form-item>
    <n-form-item label="位置">
      <n-select
        :value="data.backgroundPosition"
        :options="positionOptions"
        @update:value="(value) => handleChange(value, 'backgroundPosition')"
      />
    </n-form-item>
    <n-form-item label="尺寸">
      <n-select
        :value="data.backgroundSize"
        :options="sizeOptions"
        @update:value="(value) => handleChange(value, 'backgroundSize')"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { SelectOption, UploadCustomRequestOptions } from 'naive-ui'
import { NForm, NFormItem, NInput, NSelect, NUpload, NButton } from 'naive-ui'
import type { BackgroundImage } from '@/types/common'
import { cloneDeep } from 'lodash-es'
import { uploadImageFileApi } from '@/api/images'

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

const customRequest = async ({ file, onFinish, onError }: UploadCustomRequestOptions) => {
  try {
    const formData = new FormData()
    formData.append('file', file.file as File)
    const resp = await uploadImageFileApi(formData)
    if (resp.status === 200) {
      handleChange(resp.data.url, 'backgroundImage')
    }
    onFinish()
  } catch (e) {
    onError()
  }
}

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
