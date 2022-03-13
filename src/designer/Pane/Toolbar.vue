<template>
  <div class="tool-bar">
    <!-- <div>{{ basicStore.name }}</div> -->
    <div class="tool-bar-item">
      <div>
        <el-button size="small" @click="save" title="保存">
          <el-icon style="vertical-align: middle">
            <icon-save-one theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>保存</span>
        </el-button>
        <el-button size="small" @click="preview" title="预览">
          <el-icon style="vertical-align: middle">
            <icon-computer theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>预览</span>
        </el-button>
        <el-button size="small" @click="undo" title="撤销">
          <el-icon style="vertical-align: middle" @click="undo">
            <icon-back theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>撤销</span>
        </el-button>
        <el-button size="small" @click="recoveryDraft" title="恢复">
          <el-icon style="vertical-align: middle">
            <icon-next theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>恢复</span>
        </el-button>
        <el-button size="small" @click="exportCanvas" title="导出">
          <el-icon style="vertical-align: middle">
            <icon-download-one theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>导出</span>
        </el-button>
        <el-button size="small" @click="importCanvas" title="导入">
          <el-icon style="vertical-align: middle">
            <icon-upload-one theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>导入</span>
        </el-button>
        <el-button size="small" @click="fullScreen" title="全屏">
          <el-icon style="vertical-align: middle">
            <icon-full-screen theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>全屏</span>
        </el-button>
        <el-button size="small" @click="setShowEm" title="坐标">
          <el-icon style="vertical-align: middle">
            <icon-cones theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>坐标</span>
        </el-button>
      </div>

      <div>
        <el-button class="resource" size="small" @click="showIcon" title="图标">
          <el-icon style="vertical-align: middle">
            <icon-game-ps theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>图标</span>
        </el-button>
        <el-button class="resource" size="small" @click="() => (showImageView = true)" title="图片">
          <el-icon style="vertical-align: middle">
            <icon-picture theme="outline" size="22" fill="#1e90ff" />
          </el-icon>
          <span>图片</span>
        </el-button>
      </div>
    </div>
  </div>

  <el-dialog v-model="saveDialogVisible" title="保存当前布局" width="30%" center>
    <el-form :model="form" :rules="rules" @submit.prevent>
      <el-form-item label="页面名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入页面名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit('new')" v-if="isCreate">新增页面</el-button>
        <el-button type="primary" @click="handleSubmit('update')" v-else>更新页面</el-button>
      </span>
    </template>
  </el-dialog>
  <IconFont v-model:visible="showIconFont" />
  <ImageView v-model:visible="showImageView" />
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, watch, onUnmounted } from 'vue'
import type { WatchStopHandle } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { successMessage, errorMessage, warnMessage } from '@/utils/message'
import { useRoute, useRouter } from 'vue-router'
import type { LayoutData } from '@/types/apiTypes'
import { saveUIComponents, updateUIComponents } from '@/api/pages'
import { exportRaw, importRaw } from '@/utils/utils'
import IconFont from './IconFont.vue'
import ImageView from './ImageView.vue'
import { ElForm, ElInput, ElFormItem, ElButton, ElDialog, ElIcon } from 'element-plus'
// import type { UploadFile } from 'element-plus/lib/components/upload/src/upload.type'
import { ComponentInfo } from '@/types/component'
import { CanvasStyleData } from '@/types/storeTypes'
import { StoreComponentData } from '@/utils/db'

// 状态管理
const basicStore = useBasicStoreWithOut()
const snapShotStore = useSnapShotStoreWithOut()
// const userStore = useUserStoreWithOut()

const router = useRouter()
const route = useRoute()

// 计算属性
const componentData = computed(() => basicStore.componentData)
const canvasStyleData = computed(() => basicStore.canvasStyleData)
const isCreate = computed(() => route.path === '/create')

let index = ''

// 自定义属性
const saveDialogVisible = ref<boolean>(false)
const showIconFont = ref<boolean>(false)
const showImageView = ref<boolean>(false)
const form = reactive<{
  name: string
  thumbnail: string
}>({
  name: '',
  thumbnail: ''
})

interface Rules {
  required: boolean
  message: string
  trigger: string
}
const rules = reactive<{
  name: Rules[]
}>({
  name: [{ required: true, message: '请输入页面名称', trigger: 'blur' }]
})

let snapShotId = 0
onMounted(() => {
  setTimeout(() => {
    form.name = basicStore.name
    form.thumbnail = basicStore.thumbnail
  }, 500)
})

const undo = async () => {
  let snapshot: StoreComponentData | undefined
  if (snapShotId <= 0) {
    snapshot = await snapShotStore.undo()
  } else {
    snapshot = await snapShotStore.undo(snapShotId - 1)
  }
  console.log(snapshot)
  if (snapshot) {
    snapShotId = snapshot.id!
    basicStore.setLayoutData({ canvasData: snapshot.canvasData, canvasStyle: snapshot.canvasStyle })
  } else {
    warnMessage('没有快照了')
  }
}

const preview = () => {
  const { href } = router.resolve('/preview')
  window.open(href, '_blank')
}

const save = () => {
  saveDialogVisible.value = true
}

// const handleChangeFile = (file: UploadFile, _) => {
//   const reader: FileReader = new FileReader()
//   reader.readAsDataURL(file['raw'])
//   reader.onload = () => {
//     form.thumbnail = reader.result as string
//   }
// }

const recoveryDraft = async () => {
  let snapshot: StoreComponentData | undefined
  if (snapShotId <= 0) {
    snapshot = await snapShotStore.undo()
  } else {
    snapshot = await snapShotStore.undo(snapShotId + 1)
  }
  console.log(snapshot)
  if (snapshot) {
    snapShotId = snapshot.id!
    basicStore.setLayoutData({ canvasData: snapshot.canvasData, canvasStyle: snapshot.canvasStyle })
  } else {
    warnMessage('没有快照了')
  }
}

const setShowEm = () => {
  basicStore.toggleShowEm()
}

const showIcon = () => {
  showIconFont.value = !showIconFont.value
}

const fullScreen = () => {
  const el: HTMLElement | null = document.querySelector('.center.scrollbar')
  if (document.fullscreenEnabled && el) {
    el.requestFullscreen()
  }
}

const handleSubmit = async (type: string) => {
  const { name, thumbnail } = form
  if (!name) {
    errorMessage('请输入页面名称')
    return
  }

  const layoutData: LayoutData = {
    name: name,
    thumbnail: thumbnail!,
    canvasData: componentData.value,
    canvasStyle: canvasStyleData.value
  }
  basicStore.setName(name)
  basicStore.setThumbnail(thumbnail!)

  if (type === 'update') {
    try {
      await updateUIComponents(index, layoutData)
      successMessage('修改成功')
    } catch (e) {
      errorMessage('保存失败，请导出到本地，并重新进入此页面')
    } finally {
      saveDialogVisible.value = false
    }
  } else {
    try {
      const result: LayoutData = await saveUIComponents(layoutData)
      successMessage('保存成功')
      // // 新增页面成功，则跳转到编辑页面
      router.push({
        name: 'Editor',
        params: {
          index: result.id
        }
      })
    } catch (e: any) {
      errorMessage(`保存失败，失败信息:${e?.message || e}`)
    } finally {
      saveDialogVisible.value = false
    }
  }
}

const exportCanvas = () => {
  const name: string = `${basicStore.name}` || 'layout'
  exportRaw(
    `${name}.json`,
    JSON.stringify({
      canvasData: componentData.value,
      canvasStyle: canvasStyleData.value
    })
  )
}

const importCanvas = () => {
  importRaw(fileHandler, '.json')
}

const fileHandler = (loadEvent: ProgressEvent<FileReader>) => {
  if (loadEvent.target && loadEvent.target.result) {
    const layoutComponents: { canvasData: ComponentInfo[]; canvasStyle: CanvasStyleData } =
      JSON.parse(loadEvent.target.result as string)
    if (layoutComponents) {
      basicStore.setComponentData(layoutComponents.canvasData)
      basicStore.setCanvasStyle(layoutComponents.canvasStyle)
    }
  }
}
const stopHandle: WatchStopHandle = watch(
  () => route.params.index,
  (toParams, _) => {
    index = toParams as string
  },
  { immediate: true }
)

onUnmounted(() => {
  stopHandle()
})
</script>

<style scoped lang="less">
.tool-bar-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* .resource {
    align-items: right;
  } */
}
button {
  margin-left: 0px !important;
  color: #1e90ff;
  border: none;
  padding: 5px 5px;
}
</style>
