<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <n-scrollbar>
      <n-form size="small" @submit.prevent label-placement="left" label-align="left">
        <n-form-item label="分辨率">
          <n-select
            v-model:value="myPixel"
            @update:value="setScreenSize"
            placeholder="选择分辨率"
            :options="piexls"
          />
        </n-form-item>
        <n-form-item v-for="({ key, label, type }, index) in styleKeys" :key="index" :label="label">
          <n-input-number v-if="key === 'scale'" v-model="scale" @input="handleScaleChange" />
          <n-input-number v-else-if="type === 'number'" v-model:value="canvasStyleData[key]" />
          <n-input v-else v-model:value="canvasStyleData[key]" />
        </n-form-item>
      </n-form>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { computed, reactive, ref } from 'vue'
import { cloneDeep, debounce } from 'lodash-es'
import { NForm, NFormItem, NInput, NSelect, NInputNumber, NScrollbar } from 'naive-ui'
import PixelEnum from '@/enum/pixel'

const piexls = computed<Recordable<string>[]>(() => {
  return [{ label: '本设备', value: `${window.innerWidth}X${window.innerHeight}` }, ...PixelEnum]
})

const basicStore = useBasicStoreWithOut()

const canvasStyleData = computed(() => basicStore.canvasStyleData)

const myPixel = ref<string>('本设备')
const styleKeys = [
  { key: 'width', label: '宽度', type: FormType.NUMBER },
  { key: 'height', label: '高度', type: FormType.NUMBER },
  { key: 'scale', label: '比例', type: FormType.NUMBER },
  { key: 'dataWs', label: '实时数据', type: FormType.TEXT },
  { key: 'image', label: '背景图', type: FormType.TEXT }
]

// 需要随着画布大小变化的属性
const needToChange = reactive<Array<string>>([
  'top',
  'left',
  'width',
  'height',
  'fontSize',
  'borderWidth'
])
const scale = ref<number>(canvasStyleData.value.scale)

const format = (value) => {
  return (value * scale.value) / 100
}

const getOriginStyle = (value) => {
  return value / (canvasStyleData.value.scale / 100)
}

const handleScaleChange = debounce(() => {
  // 画布比例设一个最小值，不能为 0
  // eslint-disable-next-line no-bitwise
  scale.value = ~~scale.value || 1
  const componentDatas = cloneDeep(basicStore.componentData)
  componentDatas.forEach((component) => {
    Object.keys(component.style).forEach((key) => {
      if (needToChange.includes(key)) {
        // 根据原来的比例获取样式原来的尺寸
        // 再用原来的尺寸 * 现在的比例得出新的尺寸
        // 不能用 Math.round 防止 1 px 的边框变 0
        component.style[key] = Math.ceil(format(getOriginStyle(component.style[key])))
      }
    })
  })

  basicStore.setComponentData(componentDatas)
  basicStore.setCanvasStyle({
    ...canvasStyleData.value,
    scale: scale.value
  })
}, 1000)

const setScreenSize = (piexl: string) => {
  const piexls = piexl.split('X')
  const width = parseInt(piexls[0])
  const height = parseInt(piexls[1])
  basicStore.setCanvasStyle({
    ...canvasStyleData.value,
    width,
    height
  })
}
</script>

<style scoped>
@layer components {
  .attr-list {
    @apply overflow-auto p-1 pt-0 h-full;

    backdrop-filter: blur(50px);
    margin-right: 10px;
  }
}
</style>
