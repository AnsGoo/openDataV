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
import type { PyodideInterface } from 'pyodide/api'

const code = ref<string>('')
const run = async () => {
  if (pyodide) {
    const result = pyodide!.runPython(code.value)
    console.log(result)
  }
}

let pyodide: PyodideInterface | null
onMounted(async () => {
  console.log(pyodide)
  if (!pyodide) {
    const pyodidePkg = await import('pyodide/pyodide')
    pyodide = await pyodidePkg.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/'
    })

    await pyodide.loadPackage('pandas')
  }
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
