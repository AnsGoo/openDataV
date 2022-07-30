<template>
  <div class="ide">
    <div>
      <CodeEditor v-model:code="code" />
    </div>
    <div>
      <n-button @click="run" type="primary" round>Run</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NButton } from 'naive-ui'
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
