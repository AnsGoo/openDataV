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
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import CodeEditor from '../components/CodeEditor.vue'
const pyodideWorker = new Worker('/webworker/index.js')

pyodideWorker.onmessage = (event: MessageEvent<any>) => {
  const { id, ...data } = event.data
  console.log(id)
  console.log(data)
}

const code = ref<string>('')
const run = async () => {
  const id = 1
  await pyodideWorker.postMessage({ id, python: code.value })
}
</script>
<style lang="less" scoped>
.ide {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
}
</style>
