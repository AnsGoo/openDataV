<template>
  <div ref="mainEl" v-show="visible">
    <div>
      <span class="date">{{ alarmInfo.date }}</span>
      <span class="tag icon iconfont icon-a-baojingjinggaoyujingjinggaodeng">
        <span class="current-value">{{ alarmInfo.tagValue }}</span> /
        <span class="alarm-value">{{ alarmInfo.alarmValue }}</span>
      </span>
      <span class="type" v-if="alarmInfo.type === 1">超限</span>
      <span class="type" v-if="alarmInfo.type === 0">状态</span>
    </div>
    <div class="desc">{{ alarmInfo.desc }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import type { ComponentInfo } from '@/types/component'
import type { AlarmType, AlarmInfo } from '@/types/wsTypes'
import { useEventBus } from '@/bus/useEventBus'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()

const visible = ref<boolean>(true)
let timeoutHandle: TimeoutHandle

const typeColor = computed<string>(() => {
  return props.propValue.typeColor || '#fff'
})

const typeFontSize = computed<string>(() => {
  return props.propValue.typeFontSize ? `${props.propValue.typeFontSize}px` : '20px'
})

const typeFontWeight = computed<string>(() => {
  return props.propValue.typeFontWeight || '900'
})
const typeBackgroundColor = computed<string>(() => {
  return props.propValue.typeBackgroundColor || '#1E90FF'
})

const typeFontFamily = computed<string>(() => {
  return props.propValue.typeFontFamily || ''
})

const dateColor = computed<string>(() => {
  return props.propValue.dateColor || '#1E90FF'
})

const dateFontSize = computed<string>(() => {
  return props.propValue.dateFontSize ? `${props.propValue.dateFontSize}px` : '20px'
})

const dateFontWeight = computed<string>(() => {
  return props.propValue.dateFontWeight || '900'
})
const dateFontFamily = computed<string>(() => {
  return props.propValue.dateFontFamily || 'LED'
})

const descFontSize = computed<string>(() => {
  return props.propValue.descFontSize ? `${props.propValue.descFontSize}px` : '20px'
})

const descFontWeight = computed<string>(() => {
  return props.propValue.descFontWeight || '900'
})
const descFontFamily = computed<string>(() => {
  return props.propValue.descFontFamily || ''
})

const valueColor0 = computed<string>(() => {
  return props.propValue.valueColor0 || '#1E90FF'
})

const valueFontSize = computed<string>(() => {
  return props.propValue.valueFontSize ? `${props.propValue.valueFontSize}px` : '20px'
})

const valueFontWeight = computed<string>(() => {
  return props.propValue.valueFontWeight || '900'
})
const valueFontFamily = computed<string>(() => {
  return props.propValue.valueFontFamily || 'LCD'
})

const valueColor = ref<string>(props.propValue.valueColor1 || '#ffd700')

const alarmInfo = reactive<AlarmInfo>({
  date: '2021-01-01 10:10:10',
  desc: '报警了...',
  level: 1,
  type: 1,
  alarmValue: '123',
  tagValue: '124'
})

const dataHandler = (event) => {
  const item: AlarmType = event as AlarmType
  const tagExpression = RegExp(props.propValue.tagExpression)
  if (tagExpression.test(item.TagName)) {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
    }
    const level = item.Level
    alarmInfo.tagValue = item.TagValue
    alarmInfo.date = item.AlarmTime
    alarmInfo.desc = item.AlarmDescription
    alarmInfo.level = Number(item!.Level)
    alarmInfo.type = Number(item.AlarmType)
    alarmInfo.alarmValue = item.AlarmValue
    if (level === 1) {
      valueColor.value = props.propValue.valueColor1
    } else if (level === 2) {
      valueColor.value = props.propValue.valueColor2
    }
    visible.value = true
    hiddenAlarm()
  }
}
onMounted(async () => {
  hiddenAlarm()
})

useEventBus('actual', dataHandler)

const hiddenAlarm = () => {
  const timeout = props.propValue.timeout as unknown as number
  if (timeout && timeout > 0) {
    timeoutHandle = setTimeout(() => {
      visible.value = false
    }, Number(timeout) * 1000)
  }
}
onUnmounted(() => {
  if (timeoutHandle) {
    clearTimeout(timeoutHandle)
  }
})
</script>

<style lang="less" scoped>
div {
  text-align: center;
  vertical-align: middle;
  font-size: 0px;
}
span.date {
  margin: auto 10px;
  color: v-bind(dateColor);
  font-size: v-bind(dateFontSize);
  font-weight: v-bind(dateFontWeight);
  font-family: v-bind(dateFontFamily);
}
span.type {
  background-color: v-bind(typeBackgroundColor);
  color: v-bind(typeColor);
  font-size: v-bind(typeFontSize);
  font-weight: v-bind(typeFontWeight);
  font-family: v-bind(typeFontFamily);
  margin: auto 10px;
}
span.tag {
  color: v-bind(valueColor);
  margin: auto 10px;
  font-size: v-bind(valueFontSize);
  font-weight: v-bind(valueFontWeight);
  span.current-value {
    color: v-bind(valueColor);
    font-family: v-bind(valueFontFamily);
  }
  span.alarm-value {
    color: v-bind(valueColor0);
    font-family: v-bind(valueFontFamily);
  }
}
div.desc {
  color: v-bind(valueColor);
  font-size: v-bind(descFontSize);
  font-weight: v-bind(descFontWeight);
  font-family: v-bind(descFontFamily);
  white-space: break-spaces;
}
</style>
