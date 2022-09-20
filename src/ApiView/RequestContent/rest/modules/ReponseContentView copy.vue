<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { python } from '@codemirror/lang-python'

const code = ref(`console.log('Hello, world!')`)

const extensions = [javascript(), json(), python(), oneDark]

const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

const log = console.log
// Status is available at all times via Codemirror EditorView
</script>
