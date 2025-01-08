<template>
  <Container :config="baseCanvasOptions" :data="formData" :mode="mode" @change="changed" />
</template>
<script setup lang="ts">
import type { IContainerItem } from '@open-data-v/base'
import { ContainerType, FormType } from '@open-data-v/base'
import { computed, inject } from 'vue'

import { PANEL_MODEL } from '../../const'
import { Container } from '../../modules'
import { useCanvasState, useGraphState } from '../../state'

const graphState = useGraphState()
const canvasState = useCanvasState()!

const baseCanvasOptions: Array<IContainerItem> = [
  {
    label: '基本配置',
    prop: 'basic',
    children: [
      {
        prop: 'pixel',
        label: '分辨率',
        type: FormType.SELECT,
        props: {
          options: graphState.resolutionOptions.map((item) => ({
            label: item.label,
            value: `${item.value.width}X${item.value.height}`
          })),
          defaultValue: `${window.screen.width}X${window.screen.height}`
        }
      },
      {
        prop: 'width',
        label: '宽度',
        type: FormType.NUMBER,
        props: {
          defaultValue: window.screen.width
        }
      },
      {
        prop: 'height',
        label: '高度',
        type: FormType.NUMBER,
        props: {
          defaultValue: window.screen.height
        }
      },
      {
        prop: 'background',
        label: '背景',
        type: FormType.BACKGROUND,
        props: {
          defaultValue: { backgroundColor: '#272e3b' }
        }
      }
    ]
  }
]
const mode = inject<ContainerType>(PANEL_MODEL, ContainerType.CARD)

const formData = computed<Record<string, any>>(() => {
  const { width, height } = canvasState.canvasOptions
  return {
    basic: {
      pixel: `${width}X${height}`,
      width: width,
      height: height,
      background: canvasState.canvasOptions.background
    }
  }
})
const changed = (keys: Array<string>, val: any) => {
  if (keys.length === 2 && keys[0] === 'basic') {
    if (keys[1] === 'pixel') {
      const pixels = val.split('X')
      const height = parseInt(pixels[1])
      const width = parseInt(pixels[0])
      canvasState.updateCanvasOptions({
        width,
        height
      })
    } else {
      canvasState.updateCanvasOptions({
        [keys[1]]: val
      })
    }
  }
}
</script>
