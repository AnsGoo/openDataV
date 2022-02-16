<template>
  <div class="dialog-style-custom">
    <el-dialog v-model="dialogFormVisible" title="编辑数据" width="30%">
      <el-form :model="form" size="small">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="标记">
          <el-input v-model="form.tag" placeholder="请输入标记" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc" placeholder="请输入描述" type="textarea" />
        </el-form-item>
        <el-form-item label="配置">
          <el-input v-model="stringConfig" placeholder="请输入配置" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Setting } from '@/types/apiTypes'
import { ElDialog, ElForm, ElFormItem, ElButton, ElInput } from 'element-plus'

const props = withDefaults(
  defineProps<{
    visible: boolean
    data: Setting
    isEdit: boolean
  }>(),
  {
    data: undefined
  }
)

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', data: Setting): void
}>()

const dialogFormVisible = ref<boolean>(props.visible)
const form = ref<Setting | Recordable>(props.data || {})
const stringConfig = ref<string>(JSON.stringify(form.value.config || {}, undefined, 2))

const handleSubmit = () => {
  form.value.config = JSON.parse(stringConfig.value)
  emits('submit', form.value as Setting)
  emits('update:visible', false)
  dialogFormVisible.value = false
}

watch(
  () => props.data,
  () => {
    form.value = props.data || {}
    stringConfig.value = JSON.stringify(form.value.config || {}, undefined, 2)
  },
  {
    deep: true
  }
)

watch(
  () => props.visible,
  (visible) => {
    dialogFormVisible.value = visible
  }
)

watch(dialogFormVisible, (visible) => {
  emits('update:visible', visible)
})
</script>
