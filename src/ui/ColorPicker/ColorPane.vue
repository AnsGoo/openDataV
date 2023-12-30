<template>
  <div
    role="application"
    aria-label="Sketch color picker"
    class="relative rounded-sm p-2 bg-gray-200 dark:bg-gray-700"
    :class="[disableAlpha ? 'vc-sketch__disable-alpha' : '']"
  >
    <div class="w-ful relative overflow-hidden h-3/4 pb-40">
      <Saturation :value="colors" @change="childChange" />
    </div>
    <div class="flex h-8">
      <div class="w-full py-1 h-8">
        <div class="relative h-3">
          <Hue :value="colors" @change="childChange" />
        </div>
        <div v-if="!disableAlpha" class="relative h-3 overflow-hidden mt-1">
          <Alpha :value="colors" @change="childChange" />
        </div>
      </div>
      <div class="w-8 h-7 my-1 ml-1 rounded-sm" :style="{ background: activeColor }"></div>
    </div>
    <div v-if="!disableFields" class="flex text-black my-1">
      <div v-show="fieldsIndex === 'hex'" class="w-full">
        <!-- hex -->
        <div class="flex">
          <div style="width: 45px" class="whitespace-nowrap text-gray-800 dark:text-gray-50">
            {{ disableAlpha ? 'HEX:' : 'HEXA:' }}
          </div>
          <div class="mx-1.5 w-full">
            <EdIn
              v-if="!hasAlpha"
              label="hex"
              :value="colors.hex"
              class="w-full"
              @change="inputChange"
            />
            <EdIn
              v-if="hasAlpha"
              class="inline-block"
              label="hex"
              :value="colors.hex8"
              @change="inputChange"
            />
          </div>
        </div>
      </div>
      <div v-show="['rgb', 'rgba'].includes(fieldsIndex)" class="w-full flex">
        <div style="width: 45px" class="whitespace-nowrap text-gray-800 dark:text-gray-50">
          {{ disableAlpha ? 'RGB:' : 'RGBA:' }}
        </div>
        <div class="mx-1.5 flex w-full">
          <span v-for="item in ['r', 'g', 'b']" :key="item" class="w-1/4 ml-1">
            <EdIn :label="item" :value="colors.rgba[item]" @change="inputChange" />
          </span>
          <span v-if="!disableAlpha" class="w-1/4 ml-1">
            <EdIn
              label="a"
              :value="Number(colors.a.toFixed(2))"
              :arrow-offset="0.01"
              :max="1"
              @change="inputChange"
            />
          </span>
        </div>
      </div>
      <div v-show="['hsl', 'hsla'].includes(fieldsIndex)" class="w-full flex">
        <!-- hsla -->
        <div style="width: 45px" class="whitespace-nowrap text-gray-800 dark:text-gray-50">
          {{ disableAlpha ? 'HSL:' : 'HSLA:' }}
        </div>
        <div class="mx-1.5 flex w-full">
          <span v-for="item in ['h', 's', 'l']" :key="item" class="w-1/4 ml-1">
            <EdIn :label="item" :value="hsl[item]" @change="inputChange" />
          </span>
          <span v-if="!disableAlpha" class="w-1/4">
            <EdIn
              label="a"
              :value="Number(colors.a.toFixed(2))"
              :arrow-offset="0.01"
              :max="1"
              @change="inputChange"
            />
          </span>
        </div>
      </div>
      <!-- btn -->
      <div class="w-8 rounded center" style="width: 24px" role="button" @click="toggleViews">
        <svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
          @mouseover="showHighlight"
          @mouseenter="showHighlight"
          @mouseout="hideHighlight"
        >
          <path
            fill="#333"
            class="fill-gray-900 dark:fill-gray-50"
            d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
          />
        </svg>
      </div>
      <!-- btn -->
    </div>
    <div class="flex flex-row flex-nowrap">
      <template v-for="c in preColors" :key="c">
        <div
          class="rounded-sm w-5 h-5 ml-1 cursor-pointer"
          :style="{ background: c }"
          @click="handlePreset(c)"
        ></div>
      </template>
      <div
        class="bg-transparent rounded-sm border border-solid w-5 h-5 ml-1 cursor-pointer border-gray-600 dark:border-gray-50"
        @click="handlePreset(c)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ColorOption } from 'open-data-v/ui/ColorPicker/types'
import { computed, ref, watch } from 'vue'

import Alpha from './Alpha.vue'
import EdIn from './ColorInput.vue'
import Hue from './Hue.vue'
import Saturation from './Saturation.vue'
import { tinycolor, transColor } from './utils'

const innerColors: Array<string> = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
  'rgba(0,0,0,0)'
]

const props = withDefaults(
  defineProps<{
    swatches?: Array<string>
    disableAlpha?: boolean
    disableFields?: boolean
    value: ColorOption
    format?: string
  }>(),
  {
    swatches: () => [],
    disableAlpha: false,
    disableFields: false,
    format: 'hex'
  }
)

const oldHue = ref<number>(0)

const fieldsIndex = ref<string>('hex')
const emit = defineEmits<{
  (e: 'change', value: ColorOption): void
  (e: 'update:value', value: ColorOption): void
  (e: 'update:format', format: string): void
}>()

watch(
  () => props.format,
  (val) => {
    fieldsIndex.value = val
  },
  {
    immediate: true
  }
)

const preColors = computed<Array<string>>(() => {
  const incolors = props.swatches && props.swatches.length > 0 ? props.swatches : innerColors
  return incolors
})
const highlight = ref<boolean>(false)
const activeColor = computed(() => {
  const { rgba } = colors.value
  return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`
})

const showHighlight = () => {
  highlight.value = true
}
const hideHighlight = () => {
  highlight.value = false
}

const colors = computed(() => transColor(props.value, oldHue.value))
const hsl = computed(() => {
  const { h, s, l } = props.value.hsl
  return {
    h: h.toFixed(),
    s: `${(s * 100).toFixed()}%`,
    l: `${(l * 100).toFixed()}%`
  }
})

const hasAlpha = computed<boolean>(() => props.value.a < 1)

function toggleViews() {
  switch (fieldsIndex.value) {
    case 'hex':
      fieldsIndex.value = `rgb${props.disableAlpha ? '' : 'a'}`
      break
    case 'rgb':
    case 'rgba':
      fieldsIndex.value = `hsl${props.disableAlpha ? '' : 'a'}`
      break
    default:
      fieldsIndex.value = 'hex'
      break
  }
  emit('update:format', fieldsIndex.value)
}

function colorChange(data, hue?: any) {
  oldHue.value = colors.value.hsl.h
  const color = transColor(data, hue | oldHue.value)
  emit('update:value', color)
  emit('change', color)
}

function isValidHex(hex: string) {
  return tinycolor(hex).isValid
}
function isTransparent(color) {
  return tinycolor(color).getAlpha() === 0
}

function handlePreset(c) {
  colorChange(c)
}
function childChange(data) {
  colorChange(data)
}

function inputChange(data) {
  if (!data) return

  if (data.hex) {
    isValidHex(data.hex) &&
      colorChange({
        hex: data.hex,
        source: 'hex'
      })
  } else if (data.r || data.g || data.b || data.a) {
    colorChange({
      r: data.r || colors.value.rgba.r,
      g: data.g || colors.value.rgba.g,
      b: data.b || colors.value.rgba.b,
      a: data.a || colors.value.rgba.a,
      source: 'rgba'
    })
  }
}
</script>
