<template>
  <div class="header">
    <n-divider title-placement="left" style="width: 50%">
      {{ title }}
    </n-divider>
    <n-divider title-placement="right" style="width: 50%">
      <icon-park name="add-three" color="#18A058" @click="addParams()" class="action" />
      <icon-park name="clear" color="#F76560" @click="clearParams()" class="action" />
      <icon-park name="editor" color="#2080F0" @click="editParams()" class="action" />
    </n-divider>
  </div>
  <div v-for="(item, index) in formData" :key="item.id">
    <n-input-group class="param-item">
      <!-- <n-select
        v-if="options && options.length > 0"
        style="width: 50%"
        size="small"
        filterable
        tag
        :modelValue="formData[index]['key']"
        @update:value="(value) => changed(index, 'key', value)"
        :allow-input="noSideSpace"
        :placeholder="`参数${index + 1}`"
        :options="
          options.map((el) => {
            return { label: el, value: el }
          }) || []
        "
      /> -->
      <n-input
        style="width: 50%"
        size="small"
        :input-props="{
          autocomplete: 'disabled'
        }"
        :value="formData[index]['key']"
        @update:value="(value) => changed(index, 'key', value)"
        :allow-input="noSideSpace"
        :placeholder="`参数${index + 1}`"
      />
      <n-input
        style="width: 50%"
        size="small"
        :value="formData[index]['value']"
        @update:value="(value) => changed(index, 'value', value)"
        :allow-input="noSideSpace"
        :placeholder="`值${index + 1}`"
      />
      <n-button size="small" @click="disableParams(index)">
        <template #icon>
          <icon-park
            :name="item.disable ? 'close-one' : 'check-one'"
            :color="item.disable ? '#333639' : '#2080F0'"
          />
        </template>
      </n-button>
      <n-button size="small" @click="removeParams(index)">
        <template #icon>
          <icon-park name="delete-one" color="#F76560" />
        </template>
      </n-button>
    </n-input-group>
  </div>
</template>
<script lang="ts" setup>
import { uuid } from '@/utils/utils'
import { NInput, NButton, NInputGroup, NDivider } from 'naive-ui'
import { ref, watch } from 'vue'
import { KV } from './type'

const props = withDefaults(defineProps<{ value: Array<KV>; title: string; options?: string[] }>(), {
  title: '',
  value: () => [
    {
      key: '',
      value: '',
      disable: false,
      id: uuid(),
      options: []
    }
  ]
})

const emits = defineEmits<{
  (e: 'update:value', value: KV[]): void
}>()

const formData = ref<KV[]>(props.value)

const changed = (index: number, param: string, value: any) => {
  formData.value[index][param] = value

  emits('update:value', formData.value)
}

const addParams = () => {
  const index = formData.value.length
  formData.value.splice(index, 0, { key: '', value: '', disable: false, id: uuid() })
  emits('update:value', formData.value)
}
const removeParams = (index: number) => {
  formData.value.splice(index, 1)
  if (formData.value.length === 0) {
    formData.value.push({ key: '', value: '', disable: false, id: uuid() })
  }
  emits('update:value', formData.value)
}
const clearParams = () => {
  formData.value = [{ key: '', value: '', disable: false, id: uuid() }]
  emits('update:value', formData.value)
}

const editParams = () => {
  emits('update:value', formData.value)
}
const disableParams = (index: number) => {
  formData.value[index].disable = !formData.value[index].disable
  emits('update:value', formData.value)
}
const noSideSpace = (value: string) => {
  return !value.startsWith(' ') && !value.endsWith(' ')
}

watch(
  () => props.value,
  () => {
    if (props.value) {
      formData.value = props.value
    }
  }
)
</script>
<style lang="less" scoped>
:deep(.n-divider:not(.n-divider--vertical)) {
  margin-top: 5px;
  margin-bottom: 5px;
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .action {
    &:hover {
      scale: 1.2;
    }
    transition: transform 1s scale;
  }
}
</style>
