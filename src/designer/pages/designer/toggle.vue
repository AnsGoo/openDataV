<template>
  <span class="relative toggle z-50"> {{ viewSymbol }} </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    direction?: 'left' | 'right'
    location?: 'left' | 'right'
    x?: string
    y?: string
  }>(),
  {
    direction: 'left',
    x: '50%',
    y: '50%',
    location: 'left'
  }
)
const viewSymbol = computed<string>(() => {
  return props.location === 'left' && props.direction === 'left' ? '<' : '>'
})
const top = computed<string>(() => props.y || '50%')
const left = computed<string>(() =>
  props.location === 'left' ? `calc(${props.x} - 10px)` : 'unset'
)
const right = computed<string>(() => (props.location === 'right' ? `0` : 'unset'))
</script>
<style scoped lang="less">
.toggle {
  transition-property: left, right;
  transition-duration: 0.5s;
  top: v-bind(top);
  left: v-bind(left);
  right: v-bind(right);
  border: 1px solid;
  background-color: #48484e;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 10px;
  align-content: center;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
}
</style>
