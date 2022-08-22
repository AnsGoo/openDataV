<template>
  <div class="tool-bar">
    <div class="tool-bar-item">
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="toHome" title="首页">
            <icon-park name="home" size="24" />
          </n-button>
        </template>
        <span>首页</span>
      </n-tooltip>
      <n-divider vertical />
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="save" title="保存" v-action="'add'">
            <icon-park name="save-one" size="22" />
          </n-button>
        </template>
        <span>保存</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="preview" title="预览">
            <icon-park name="computer" size="22" />
          </n-button>
        </template>
        <span>预览</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="undo" title="撤销">
            <icon-park name="back" size="22" />
          </n-button>
        </template>
        <span>撤销</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="recoveryDraft" title="恢复">
            <icon-park name="next" size="22" />
          </n-button>
        </template>
        <span>恢复</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="exportCanvas" title="导出">
            <icon-park name="download-one" size="22" />
          </n-button>
        </template>
        <span>导出</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="importCanvas" title="导入">
            <icon-park name="upload-one" size="22" />
          </n-button>
        </template>
        <span>导入</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="fullScreen" title="全屏">
            <icon-park name="full-screen" size="22" />
          </n-button>
        </template>
        <span>全屏</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary size="small" @click="setShowEm" title="坐标">
            <icon-park name="cones" size="22" />
          </n-button>
        </template>
        <span>坐标</span>
      </n-tooltip>
    </div>

    <div class="tool-bar-item">
      <n-tooltip>
        <template #trigger>
          <n-button quaternary class="resource" size="small" @click="showIcon" title="图标">
            <icon-park name="game-ps" size="22" />
          </n-button>
        </template>
        <span>图标</span>
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button
            quaternary
            class="resource"
            size="small"
            @click="() => (showImageView = true)"
            title="图片"
          >
            <icon-park name="picture" size="22" />
          </n-button>
        </template>
        <span>图片</span>
      </n-tooltip>
    </div>
  </div>

  <n-modal v-model:show="saveDialogVisible" center>
    <n-card title="保存当前布局" :style="{ width: '30%' }" size="medium">
      <n-form :model="form" :rules="rules" @submit.prevent>
        <n-form-item label="页面名称" prop="name">
          <n-input v-model="form.name" placeholder="请输入页面名称" />
        </n-form-item>
      </n-form>
      <template #footer>
        <span class="dialog-footer">
          <n-button @click="saveDialogVisible = false">取消</n-button>
          <n-button type="primary" @click="handleSubmit('new')" v-if="isCreate">新增</n-button>
          <n-button type="primary" @click="handleSubmit('update')" v-else>更新</n-button>
        </span>
      </template>
    </n-card>
  </n-modal>
  <IconFont v-model:visible="showIconFont" />
  <!-- <ImageView v-model:visible="showImageView" /> -->
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, watch, onUnmounted } from 'vue'
import type { WatchStopHandle } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { message } from '@/utils/message'
import { useRoute, useRouter } from 'vue-router'
import type { LayoutData } from '@/types/apiTypes'
import { saveUIComponents, updateUIComponents } from '@/api/pages'
import { exportRaw, importRaw } from '@/utils/utils'
import IconFont from './IconFont.vue'
import { NForm, NInput, NFormItem, NButton, NModal, NCard, NTooltip, NDivider } from 'naive-ui'
import { CanvasStyleData } from '@/types/storeTypes'
import { StoreComponentData } from '@/utils/db'
import { ComponentDataType } from '@/resource/models'
// 状态管理
const basicStore = useBasicStoreWithOut()
const snapShotStore = useSnapShotStoreWithOut()
// const userStore = useUserStoreWithOut()

const router = useRouter()
const route = useRoute()

// 计算属性
const componentData = computed(() => basicStore.componentData)
const canvasStyleData = computed(() => basicStore.canvasStyleData)
const isCreate = computed(() => route.name === 'Create')

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

onMounted(() => {
  setTimeout(() => {
    form.name = basicStore.name
    form.thumbnail = basicStore.thumbnail
  }, 500)
})

const undo = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotStore.lastRecord()
  if (snapshot) {
    basicStore.setLayoutData({ canvasData: snapshot.canvasData, canvasStyle: snapshot.canvasStyle })
  } else {
    message.warning('没有快照了')
  }
}

const preview = () => {
  const { href } = router.resolve('/preview')
  window.open(href, '_blank')
}

const toHome = () => {
  router.push({
    name: 'Pages'
  })
}

const save = () => {
  saveDialogVisible.value = true
}

const recoveryDraft = async () => {
  const snapshot: StoreComponentData | undefined = await snapShotStore.nextRecord()
  if (snapshot) {
    basicStore.setLayoutData({ canvasData: snapshot.canvasData, canvasStyle: snapshot.canvasStyle })
  } else {
    message.warning('没有快照了')
  }
}

const setShowEm = () => {
  basicStore.toggleShowEm()
}

const showIcon = () => {
  showIconFont.value = !showIconFont.value
}

const fullScreen = () => {
  const el: HTMLElement | null = document.querySelector('#editor')
  if (document.fullscreenEnabled && el) {
    el.requestFullscreen()
  }
}

const handleSubmit = async (type: string) => {
  const { name, thumbnail } = form
  if (!name) {
    message.error('请输入页面名称')
    return
  }

  const layoutData: LayoutData = {
    name: name,
    thumbnail: thumbnail!,
    canvasData: componentData.value,
    canvasStyle: canvasStyleData.value
  }
  basicStore.setName(name)

  if (type === 'update') {
    try {
      await updateUIComponents(index, layoutData)
      message.success('修改成功')
    } catch (e) {
      message.error('保存失败，请导出到本地，并重新进入此页面')
    } finally {
      saveDialogVisible.value = false
    }
  } else {
    try {
      const result: LayoutData = await saveUIComponents(layoutData)
      message.success('保存成功')
      // // 新增页面成功，则跳转到编辑页面
      router.push({
        name: 'Editor',
        params: {
          index: result.id
        }
      })
    } catch (e: any) {
      message.error(`保存失败，失败信息:${e?.message || e}`)
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
      canvasData: basicStore.layoutData,
      canvasStyle: canvasStyleData.value
    })
  )
}

const importCanvas = () => {
  importRaw(fileHandler, '.json')
}

const fileHandler = (loadEvent: ProgressEvent<FileReader>) => {
  if (loadEvent.target && loadEvent.target.result) {
    const layoutComponents: { canvasData: ComponentDataType[]; canvasStyle: CanvasStyleData } =
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
.tool-bar {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px solid #c9cdd4;
}

button {
  border: none;
  padding: 5px 5px;
  margin: auto 3px;
}
</style>
