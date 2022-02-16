<template>
  <main>
    <h1>系统设置</h1>
    <div class="toolbar">
      <el-button type="primary" @click="handleAddClick">新增</el-button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        :border="true"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        size="small"
        height="86vh"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="tag" label="名称" />
        <el-table-column prop="name" label="标记" width="200" />
        <el-table-column label="配置" width="200">
          <template #default="scope">
            <el-popover placement="right" width="fit-content" trigger="hover">
              <template #default>
                <pre>{{ scope.row.config }}</pre>
              </template>
              <template #reference>
                <label class="detail">{{ scope.row.config }}</label>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="备注" width="400" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit v-model:visible="showDialog" :data="formData" :isEdit="isEdit" @submit="handleSubmit" />
  </main>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElPopover } from 'element-plus'
import { getSystemAll, createSystem, updateSystem, deleteSystem } from '@/api/setting'
import { errorMessage, successMessage } from '@/utils/message'
import type { Setting } from '@/types/apiTypes'
import Edit from './modules/Edit.vue'

const tableData = reactive<Setting[]>([])
const showDialog = ref<boolean>(false)
const isEdit = ref<boolean>(false)
let formData = ref<Setting | undefined>(undefined)

const handleAddClick = () => {
  formData.value = undefined
  showDialog.value = true
  isEdit.value = false
}

const handleEditClick = (row: Setting) => {
  formData.value = row
  showDialog.value = true
  isEdit.value = true
}

const handleDeleteClick = async (row: Setting) => {
  try {
    await deleteSystem(row.id!)
    successMessage('删除成功')
    await updateData()
  } catch (error) {
    errorMessage('删除失败')
  }
}

const updateData = async () => {
  try {
    const res = await getSystemAll()
    tableData.splice(0, tableData.length, ...res)
  } catch (error) {
    errorMessage(error as string)
  }
}

onMounted(async () => {
  await updateData()
})

const handleSubmit = async (data: Setting) => {
  try {
    if (isEdit.value) {
      await updateSystem(data.id!, data)
      successMessage('更新成功')
    } else {
      await createSystem(data)
      successMessage('新增成功')
    }
    await updateData()
  } catch (error) {
    errorMessage('操作失败')
  }
}
</script>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin: 20px 0;
  }

  .toolbar {
    margin-bottom: 8px;
  }
}

.detail {
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 40px;
  line-height: 40px;
}
</style>
