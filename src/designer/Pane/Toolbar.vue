<template>
  <div class="tool-bar">
    <!-- <div>{{ basicStore.name }}</div> -->
    <div class="tool-bar-item">
      <el-button size="small" @click="save" title="保存">
        <el-icon style="vertical-align: middle">
          <Finished />
        </el-icon>
      </el-button>
      <el-button size="small" @click="preview" title="预览">
        <el-icon style="vertical-align: middle">
          <View />
        </el-icon>
      </el-button>
      <el-button size="small" @click="undo" title="撤销">
        <el-icon style="vertical-align: middle" @click="undo">
          <TopLeft />
        </el-icon>
      </el-button>
      <el-button size="small" @click="recoveryDraft" title="恢复">
        <el-icon style="vertical-align: middle">
          <TopRight />
        </el-icon>
      </el-button>
      <el-button size="small" @click="clearCanvas" title="清空">
        <el-icon style="vertical-align: middle">
          <Brush />
        </el-icon>
      </el-button>
      <el-button size="small" @click="exportCanvas" title="导出">
        <el-icon style="vertical-align: middle">
          <Download />
        </el-icon>
      </el-button>
      <el-button size="small" @click="importCanvas" title="导入">
        <el-icon style="vertical-align: middle">
          <Upload />
        </el-icon>
      </el-button>
      <el-button size="small" @click="fullScreen" title="全屏">
        <el-icon style="vertical-align: middle">
          <FullScreen />
        </el-icon>
      </el-button>
      <el-button size="small" @click="compose" :disabled="composeStore.canCompose" title="组合">
        <el-icon style="vertical-align: middle">
          <FolderAdd />
        </el-icon>
      </el-button>
      <el-button size="small" @click="decompose" :disabled="composeStore.canDecompose" title="拆分">
        <el-icon style="vertical-align: middle">
          <FolderRemove />
        </el-icon>
      </el-button>
      <el-button size="small" @click="setShowEm" title="坐标">
        <el-icon style="vertical-align: middle">
          <Aim />
        </el-icon>
      </el-button>
      <el-button size="small" @click="showIcon" title="图标">
        <el-icon style="vertical-align: middle">
          <TakeawayBox />
        </el-icon>
      </el-button>
      <el-button size="small" @click="() => (showImageView = true)" title="图片">
        <el-icon style="vertical-align: middle">
          <Picture />
        </el-icon>
      </el-button>
    </div>
  </div>

  <el-dialog v-model="saveDialogVisible" title="保存当前布局" width="30%" center>
    <el-form :model="form" :rules="rules" @submit.prevent>
      <el-form-item label="页面名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入页面名称" />
      </el-form-item>
      <!-- <el-form-item label="上传缩略图">
        <el-upload
          :on-change="handleChangeFile"
          action="#"
          list-type="picture"
          :limit="1"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">文件选择</el-button>
        </el-upload>
      </el-form-item>-->
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
import { useComposeStoreWithOut } from '@/store/modules/compose'
import { successMessage, errorMessage } from '@/utils/message'
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

// 状态管理
const basicStore = useBasicStoreWithOut()
const snapShotStore = useSnapShotStoreWithOut()
const composeStore = useComposeStoreWithOut()
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

const emits = defineEmits<{
  (e: 'recovery'): void
}>()

onMounted(() => {
  setTimeout(() => {
    form.name = basicStore.name
    form.thumbnail = basicStore.thumbnail
  }, 500)
})

const undo = () => {
  snapShotStore.undo()
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

const clearCanvas = () => {
  snapShotStore.recordSnapshot()
  basicStore.clearCanvas()
}

const compose = () => {
  snapShotStore.recordSnapshot()
  composeStore.compose()
}

const decompose = () => {
  snapShotStore.recordSnapshot()
  composeStore.decompose()
}

const recoveryDraft = () => {
  emits('recovery')
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

<style scoped>
button {
  margin-left: 0px !important;
  color: rgba(30, 144, 255, 1);
  border: none;
}
</style>
