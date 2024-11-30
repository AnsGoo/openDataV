<template>
  <input
    ref="input"
    :value="value"
    class="outline-0 p-0 w-full rounded-sm dark:bg-zinc-800 bg-white text-gray-800 dark:text-gray-50 dark:border-gray-500 border border-gray-300"
    @keydown="handleKeyDown"
    @input="update"
  />
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label: string
    labelText?: string
    desc?: string
    value: number | string
    max?: number
    min?: number
    arrowOffset?: number
  }>(),
  {
    arrowOffset: 1
  }
)

const emit = defineEmits<{
  (e: 'change', value: Record<string, number>): void
  (e: 'update:value', value: number): void
}>()
function update(e) {
  handleChange(e.target.value)
}
function handleChange(newVal: number) {
  const data: Record<string, number> = {}
  data[props.label] = newVal
  if (data['hex'] === undefined && data['#'] === undefined) {
    emit('change', data)
  } else if (newVal.toString().length > 5) {
    emit('change', data)
  }
}
function handleKeyDown(e) {
  const number = Number(props.value)

  if (number) {
    const amount = props.arrowOffset || 1

    // Up
    if (e.keyCode === 38) {
      const val = number + amount
      emit('update:value', val)
      handleChange(val)
      e.preventDefault()
    }

    // Down
    if (e.keyCode === 40) {
      const val = number - amount
      emit('update:value', val)
      handleChange(val)
      e.preventDefault()
    }
  }
}
</script>
