<template>
  <Container :config="baseCanvasStyleConfig" :data="formData" :mode="mode" @change="changed" />
</template>
<script setup lang="ts">
import type { IContainerItem } from '@open-data-v/base'
import { ContainerType, FormType } from '@open-data-v/base'
import { computed, inject } from 'vue'

import { PANEL_MODEL } from '../../../const'
import { Container } from '../../../modules'
import { useCanvasState } from '../../../state'

const canvasState = useCanvasState()

const PixelEnum = [
  { label: '本设备', value: `${window.screen.width}X${window.screen.height}` },
  { label: '4K', value: '3840X2160' },
  { label: '2k', value: '2048X1080' },
  { label: '1080P', value: '1920X1080' },
  { label: '720P', value: '1366X768' },
  { label: 'iPhoneXR', value: '414X896' },
  { label: 'iPhoneSE', value: '375X667' },
  { label: 'iPhone12Pro', value: '390X884' },
  { label: 'GalaxyS8+', value: '360X740' },
  { label: 'GalaxyS20Ultra+', value: '412X915' },
  { label: 'iPadAir', value: '820X1180' },
  { label: 'iPadMini', value: '768X1024' },
  { label: 'SurfacePro7', value: '912X1368' },
  { label: 'NestHub', value: '1024X600' },
  { label: 'NestMax', value: '1028X800' }
]
const baseCanvasStyleConfig: Array<IContainerItem> = [
  {
    label: '基本配置',
    prop: 'basic',
    children: [
      {
        prop: 'pixel',
        label: '分辨率',
        type: FormType.SELECT,
        props: {
          options: PixelEnum,
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

const formData = computed<Record<string, any>>(() => canvasState.globalOption)
const changed = (keys: Array<string>, val: any) => {
  canvasState.setCanvasStyle(keys, val)
}
</script>
