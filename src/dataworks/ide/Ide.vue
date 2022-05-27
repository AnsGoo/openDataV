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
import { onMounted, ref } from 'vue'
import { ElButton } from 'element-plus'
import CodeEditor from '../components/CodeEditor.vue'
// import type { PyodideInterface } from '@/pyodide/api'
import { loadScript } from '@/utils/utils'
import type { loadPyodide } from '@/types/pyodide'

const code = ref<string>('')
const run = async () => {
  if (pyodide) {
    const result = pyodide!.runPython(code.value)
    console.log(result)
  }
}

let pyodide: any
onMounted(async () => {
  await loadScript('/pyodide/pyodide.js')
  const win: any = window
  const pyodideLoader = win.loadPyodide! as typeof loadPyodide
  pyodide = await pyodideLoader()
  await pyodide.loadPackage('pandas')
  // if (!pyodide) {
  //   const pyodidePkg = await import('@/pyodide/pyodide')
  //   pyodide = (await pyodidePkg.loadPyodide({
  //     // indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/'
  //     indexURL: '/pyodide/'
  //   })) as any as PyodideInterface
  //   await pyodide.loadPackage('pandas')
  // }
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
