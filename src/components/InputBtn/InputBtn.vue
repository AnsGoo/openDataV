<template>
  <div class="inputBtn_m">
    <div class="inputBtn_m_input">
      <input type="text" v-model="inputValue" />
    </div>
    <div class="inputBtn_m_btn" @click="clickBtn()">
      <button :style="buttonStyle">{{ propValue.btnWords }}</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BasicFetchResult } from '@/types/apiTypes'
import { http } from '@/utils/http'
import type { ComponentInfo } from '@/types/component'
import type { TagType } from '@/types/wsTypes'
import { computed, ref, onMounted } from 'vue'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<any>
}>()

let inputValue = ref<string>('0')
const clickBtn = async () => {
  isActive.value = true
  let data: TagType = {
    TagName: props.propValue.tagName,
    TagValue: String(inputValue.value)
  }

  try {
    await http.post<BasicFetchResult<string>>({
      url: props.propValue.url,
      data: data
    })
  } catch (err: any) {
    console.log(err || err?.message)
  }
  setTimeout(() => (isActive.value = false), 100)
}

onMounted(async () => {
  const url: string = props.propValue.getDataUrl
  if (url) {
    await getData(url)
  }
})
const getData = async (url: string): Promise<void> => {
  const data: Array<string> = [props.propValue.tagName]
  try {
    const resp = await http.post<BasicFetchResult<TagType[]>>({
      url: url,
      data: data
    })
    const results = resp.Results || []
    if (results.length > 0) {
      inputValue.value = results[0].TagValue
    } else {
      inputValue.value = '0'
    }
  } catch (err: any) {
    console.log(err || err?.message)
  }
}
const btnBkg = computed<string>(() => {
  return props.propValue.btnBkg
})

const btnColor = computed<string>(() => {
  return props.propValue.btnColor
})
const inputBkg = computed<string>(() => {
  return props.propValue.inputBkg
})
const inputBorColor = computed<string>(() => {
  return props.propValue.inputBorColor
})
const inputColor = computed<string>(() => {
  return props.propValue.inputColor
})

const isActive = ref<boolean>(false)
const buttonStyle = computed(() => {
  const style: Recordable<string> = {
    transform: 'translateY(0px)'
  }
  if (isActive.value) {
    style['transform'] = 'translateY(3px)'
  }
  return style
})
</script>
<style lang="less" scoped>
.inputBtn_m {
  display: flex;
  .inputBtn_m_input {
    flex: 2;
    border: 1px solid rgb(30, 144, 255);
    margin-right: 15px;
    input {
      width: 100%;
      height: 100%;
      text-align: center;
      border-style: solid;
      border-width: 1px;
      background-color: v-bind(inputBkg);
      border-color: v-bind(inputBorColor);
      color: v-bind(inputColor);
    }
  }
  .inputBtn_m_btn {
    // margin-top: 10px;
    flex: 1;
    margin-right: 15px;
    align-items: center;
    display: flex;
    justify-content: center;

    button {
      width: 100%;
      height: 100%;
      border-radius: 5%;
      background-color: v-bind(btnBkg);
      color: v-bind(btnColor);
    }
  }
}
</style>
