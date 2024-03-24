<template>
  <n-card v-if="mode === 'debug'" :title="title" style="margin-bottom: 16px; height: 100%">
    <n-tabs type="line" animated>
      <n-tab-pane name="oasis" tab="效果" display-directive="show">
        <Render />
      </n-tab-pane>
      <n-tab-pane name="attr" tab="属性" display-directive="show">
        <OCodeEditor
          v-model:value="form.propValue"
          class="content"
          mode="debug"
          height="300px"
          @update:value="propValueChange"
        />
      </n-tab-pane>
      <n-tab-pane name="style" tab="样式" display-directive="show">
        <OCodeEditor
          v-model:value="form.style"
          class="content"
          mode="debug"
          height="300px"
          @update:value="styleChange"
        />
      </n-tab-pane>
    </n-tabs>
  </n-card>
  <n-card v-else :title="title" style="margin-bottom: 16px; height: 100%">
    <Render />
  </n-card>
</template>
<script setup lang="ts">
import type { CustomComponent } from '@open-data-v/base'
import { getComponentStyle, uuid } from '@open-data-v/designer'
import { NCard, NTabPane, NTabs } from 'naive-ui'
import type { ComponentOptions, ConcreteComponent } from 'vue'
import { computed, h, reactive } from 'vue'

const props = withDefaults(
  defineProps<{
    config: new (id?: string, name?: string) => CustomComponent
    component: ConcreteComponent
    propValue: Record<string, any>
    style: Record<string, any>
    title: string
    mode?: 'view' | 'debug' | 'use'
  }>(),
  {
    mode: 'debug'
  }
)
const form = reactive<{
  propValue: string
  style: string
}>({
  propValue: JSON.stringify(props.propValue, null, '\t'),
  style: JSON.stringify(props.style, null, '\t')
})

const propValueChange = (value: string) => {
  form.propValue = value
}
const styleChange = (style: string) => {
  form.style = style
}

const Render = computed<ComponentOptions>(() => {
  const componentInstance = new props.config(uuid())
  const style = JSON.parse(form.style)
  const propValue = JSON.parse(form.propValue)
  componentInstance.setStyleValue({ style: style })
  componentInstance.setPropValue({ propValue: propValue })
  return h(props.component, {
    id: componentInstance.id,
    key: componentInstance.id,
    class: 'component',
    style: getComponentStyle(componentInstance),
    component: componentInstance
  })
})
</script>
