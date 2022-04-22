<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list" style="height: calc(100vh - 100px)">
    <el-form size="mini" @submit.prevent>
      <el-form-item label="分辨率">
        <el-select v-model="myPixel" @change="setScreenSize" placeholder="选择分辨率">
          <el-option
            v-for="device in piexls"
            :key="device.label"
            :value="device.value"
            :label="device.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-for="({ key, label, type }, index) in styleKeys" :key="index" :label="label">
        <el-input-number v-if="key === 'scale'" v-model="scale" @input="handleScaleChange" />
        <el-input-number v-else-if="type === 'number'" v-model="canvasStyleData[key]" />
        <el-input v-else v-model="canvasStyleData[key]" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { computed, reactive, ref } from 'vue'
import { cloneDeep, debounce } from 'lodash-es'
import { ElForm, ElInput, ElInputNumber, ElFormItem, ElSelect, ElOption } from 'element-plus'
import PixelEnum from '@/enum/pixel'

const piexls = computed<Recordable<string>[]>(() => {
  return [{ label: '本设备', value: `${window.innerWidth}X${window.innerHeight}` }, ...PixelEnum]
})

const basicStore = useBasicStoreWithOut()

const canvasStyleData = computed(() => basicStore.canvasStyleData)

const myPixel = ref<string>('本设备')
const styleKeys = [
  { key: 'width', label: '宽度', type: 'number' },
  { key: 'height', label: '高度', type: 'number' },
  { key: 'scale', label: '比例', type: 'number' },
  { key: 'dataWs', label: '实时数据', type: 'text' },
  { key: 'image', label: '背景图', type: 'text' }
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
