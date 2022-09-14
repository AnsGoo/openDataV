<template>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import DigitalTextComponent from './config'
import { useProp } from '@/resource/hooks'
import { DigitalType } from './type'

const props = defineProps<{
  component: DigitalTextComponent
}>()

const { propValue } = useProp<DigitalType>(props.component)

const data = computed<number>(() => propValue.dataconfig.data)
</script>

<style lang="less" scoped></style>
