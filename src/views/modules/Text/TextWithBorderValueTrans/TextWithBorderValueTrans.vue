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
  http
    .get<BasicFetchResult<Recordable<any>[]>>({
      url: props.propValue.history + props.propValue.dataTag
    })
    .then((resp) => {
      disposeData(resp.TagValue)
    })
    .catch((err) => {
      console.log(err)
    })
}

function disposeData(value) {
  if (props.propValue.isHeZha == 'true') {
    const arrCode = [
      { code: '0', value: '分闸' },
      { code: '1', value: '合闸' }
    ]
    for (let i in arrCode) {
      if (arrCode[i].code == value) {
        textValue.value = arrCode[i].value
      }
    }
  } else if (props.propValue.isGuZhang == 'true') {
    const arrCode = [
      { code: '0', value: '正常' },
      { code: '2', value: '故障' }
    ]
    for (let i in arrCode) {
      if (arrCode[i].code == value) {
        textValue.value = arrCode[i].value
      }
    }
  } else if (props.propValue.isGuZhangBianHao == 'true') {
    const arrCode = [
      { code: 1, value: '短路' },
      { code: 2, value: '过载故障反' },
      { code: 3, value: '过压故障' },
      { code: 4, value: '欠压故障' },
      { code: 5, value: '不平衡故障' },
      { code: 6, value: '漏电跳闸' },
      { code: 7, value: '漏电闭锁' },
      { code: 8, value: '瓦斯闭锁' },
      { code: 9, value: '风电闭锁' },
      { code: 10, value: '远方分励' },
      { code: 11, value: '过载故障定' }
    ]
    for (let i in arrCode) {
      if (arrCode[i].code == value) {
        textValue.value = arrCode[i].value
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
