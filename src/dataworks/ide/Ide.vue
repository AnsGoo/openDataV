<template>
  <div class="ide">
    <div>
      <CodeEditor v-model:code="code" />
    </div>
    <div>
      <el-button @click="run" type="primary" round>Run</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnMounted } from 'vue'
import { ElButton } from 'element-plus'
import CodeEditor from '../components/CodeEditor.vue'
// import type { PyodideInterface } from '@/pyodide/api'
import { loadScript } from '@/utils/utils'
import type { PyodideInterface } from '@/types/pyodide'

const code = ref<string>('')
const run = async () => {
  if (pyodide) {
    const result = pyodide!.runPython(code.value)
    console.log(result)
  }
}

let pyodide: any
onMounted(async () => {
  const win: any = window
  if (!win.loadPyodide) {
    await loadScript('/pyodide/pyodide.js')
  }
  const pyodideLoader = win.loadPyodide! as Promise<PyodideInterface>
  if (!pyodideLoader.inProgress) {
    pyodide = await pyodideLoader()
    win.pyodide = pyodide
  } else {
    pyodide = win.pyodide
  }
  await pyodide.loadPackage('pandas')
})
</script>
<style lang="less" scoped>
.ide {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
}
</style>
