<template>
  <div class="header">
    <n-divider
      title-placement="left"
      style="
         {
          width: '50%';
        }
      "
    >
      {{ title }}
    </n-divider>
    <n-divider
      title-placement="right"
      style="
         {
          width: '50%';
        }
      "
    >
      <icon-park name="add-three" color="#18A058" @click="addParams(0)" class="action" />
      <icon-park name="clear" color="#F76560" @click="clearParams()" class="action" />
      <icon-park name="editor" color="#2080F0" @click="editParams()" class="action" />
    </n-divider>
  </div>
  <div v-for="(item, index) in formData" :key="index">
    <n-input-group class="param-item">
      <n-input
        :style="{ width: '50%' }"
        size="small"
        :modelValue="formData[index]['key']"
        @update:value="(value) => changed(index, 'key', value)"
      />
      <n-input
        :style="{ width: '50%' }"
        size="small"
        :modelValue="formData[index]['value']"
        @update:value="(value) => changed(index, 'value', value)"
      />
      <n-button size="small" @click="disableParams(index)">
        <template #icon>
          <icon-park :name="item.disable ? 'close-one' : 'check-one'" color="#2080F0" />
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
import { NInput, NButton, NInputGroup, NDivider } from 'naive-ui'
import { ref } from 'vue'
import { KV } from './type'

const props = withDefaults(defineProps<{ value: Array<KV>; title: string }>(), {
  title: '',
  value: () => [
    {
      key: '',
      value: '',
      disable: false
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

const addParams = (index: number) => {
  formData.value.splice(index + 1, 0, { key: '', value: '', disable: false })
  emits('update:value', formData.value)
}
const removeParams = (index: number) => {
  formData.value.splice(index, 1)
  if (formData.value.length === 0) {
    formData.value.push({ key: '', value: '', disable: false })
  }
  emits('update:value', formData.value)
}
const clearParams = () => {
  formData.value = [{ key: '', value: '', disable: false }]
  emits('update:value', formData.value)
}

const editParams = () => {
  emits('update:value', formData.value)
}
const disableParams = (index: number) => {
  formData.value[index].disable = !formData.value[index].disable
  emits('update:value', formData.value)
}
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
