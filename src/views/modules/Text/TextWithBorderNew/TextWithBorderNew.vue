<template>
  <div
    class="textBorder"
    :style="{
      color: propValue.color,
      borderStyle: propValue.borderStyle,
      borderWidth: propValue.borderWidth + 'px',
      borderColor: propValue.borderColor,
      justifyContent: propValue.justifyContent,
      fontSize: propValue.fontSize + 'px'
    }"
  >
    {{ textValue }}
  </div>
</template>
<script setup lang="ts">
import type { BasicFetchResult } from '@/types/apiTypes'
import { useEventBus } from '@/bus/useEventBus'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import { onMounted, ref } from 'vue'

const props = defineProps<{ element: ComponentInfo; propValue: Recordable<any> }>()
const textValue = ref<string>(props.propValue.TextValue || '')

const handler = (event) => {
  const item: { TagName: string; TagValue: string } = event as {
    TagName: string
    TagValue: string
  }
  if (props.propValue.datatag && item.TagName === props.propValue.datatag) {
    const value = Number(item.TagValue)
    disposeData(value)
  }
}

onMounted(() => {
  if (props.propValue.history) {
    getData()
  }
})

if (props.propValue.history) {
  getData()
  useEventBus('actual', handler)
}
function getData() {
  if (props.propValue.transformValue == 'false') {
    console.log(39)
  }
  http
    .get<BasicFetchResult<Recordable<any>[]>>({
      url: props.propValue.history + props.propValue.dataTag
    })
    .then((resp) => {
      disposeData(resp.TagValue)
    })
    .catch((err: any) => {
      console.log(err.message || err)
    })
}
function disposeData(value) {
  if (props.propValue.transformValue == 'false') {
    textValue.value = value
  } else if (props.propValue.transformValue == 'true') {
    if (props.propValue.isDuan == 'true') {
      const arrCode = [
        { code: '0x55', value: '分闸待机' },
        { code: '0xAA', value: '合闸运行' }
      ]
      for (let i in arrCode) {
        if (arrCode[i].code == value) {
          textValue.value = arrCode[i].value
        }
      }
    } else if (props.propValue.isDuan == 'false') {
      const arrCode = [
        { code: 0, value: '无故障' },
        { code: 2, value: '绝缘开路' },
        { code: 3, value: '绝缘短路' },
        { code: 11, value: '欠压故障' },
        { code: 12, value: '过压故障' },
        { code: 14, value: '漏电闭锁故障' },
        { code: 15, value: '漏电保护故障' },
        { code: 16, value: '选漏保护故障' },
        { code: 17, value: '分闸失败' },
        { code: 19, value: '过载' },
        { code: 20, value: 'A 相短路' },
        { code: 21, value: 'B 相短路' },
        { code: 22, value: 'C 相短路' },
        { code: 23, value: '三相不平衡' },
        { code: 41, value: '备用开关量 1 开动' },
        { code: 42, value: '风电闭锁' },
        { code: 44, value: '瓦斯闭锁' },
        { code: 65, value: '瓦斯超标' },
        { code: 66, value: '高温保护' },
        { code: 84, value: '高温闭锁' },
        { code: 85, value: '断相' },
        { code: 88, value: '短路闭锁' },
        { code: 90, value: 'AB 相短路' },
        { code: 91, value: 'BC 相短路' },
        { code: 92, value: 'CA 相短路' },

        { code: 93, value: 'ABC 相短路' },
        { code: 94, value: '漏气故障' },
        { code: 95, value: '温度压力检测故障' },
        { code: 99, value: '分闸闭锁' },
        { code: 112, value: 'PT 断线' },
        { code: 113, value: '内部超温（CPU 超温）' },
        { code: 114, value: '真空管故障' },
        { code: 115, value: '定时限保护' },
        { code: 116, value: '失压保护' },
        { code: 137, value: '内温断线' },
        { code: 161, value: '外温断线' }
      ]
      for (let i in arrCode) {
        if (arrCode[i].code == value) {
          textValue.value = arrCode[i].value
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.textBorder {
  display: flex;
  align-items: center; //垂直居中
}
</style>
