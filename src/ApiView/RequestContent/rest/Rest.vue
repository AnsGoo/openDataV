<template>
  <NCard>
    <div class="api">
      <n-select
        :options="options"
        class="method"
        v-model:value="formData['method']"
        :show-arrow="false"
      />
      <n-input class="url" v-model:value="formData['url']" />
      <n-space>
        <n-button-group class="send">
          <n-button type="primary">发送</n-button>
          <n-dropdown :options="sendOptions" trigger="hover" :show-arrow="true">
            <n-button type="primary">
              <template #icon>
                <icon-park name="down" />
              </template>
            </n-button>
          </n-dropdown>
        </n-button-group>
      </n-space>
      <n-space>
        <n-button-group class="save">
          <n-button>保存</n-button>
          <n-dropdown :options="saveOptions" trigger="hover" :show-arrow="true">
            <n-button>
              <template #icon>
                <icon-park name="down" />
              </template>
            </n-button>
          </n-dropdown>
        </n-button-group>
      </n-space>
    </div>
    <div class="config">
      <n-tabs type="line" animated>
        <n-tab-pane name="query" tab="请求参数">
          <div class="params">
            <div v-for="(param, index) in formData['params']" :key="index">
              <n-input-group class="param-item">
                <n-input
                  :style="{ width: '50%' }"
                  size="small"
                  v-model:value="formData['params'][index]['key']"
                />
                <n-input
                  :style="{ width: '50%' }"
                  size="small"
                  v-model:value="formData['params'][index]['value']"
                />
                <n-button size="small" @click="addParams(index)">
                  <template #icon>
                    <icon-park name="add-three" color="#4CD263" />
                  </template>
                </n-button>
                <n-button size="small" @click="removeParams(index)">
                  <template #icon>
                    <icon-park name="delete-one" color="#F76560" />
                  </template>
                </n-button>
              </n-input-group>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="body" tab="请求体" />
        <n-tab-pane name="headers" tab="请求头" />
      </n-tabs>
    </div>
    <div class="response"></div>
  </NCard>
</template>
<script setup lang="ts">
import {
  NCard,
  NInput,
  NSelect,
  NButton,
  NButtonGroup,
  NDropdown,
  NSpace,
  NTabs,
  NTabPane,
  NInputGroup
} from 'naive-ui'
import { reactive } from 'vue'

const options = [
  {
    label: 'GET',
    value: 'GET'
  },
  {
    label: 'POST',
    value: 'POST'
  },
  {
    label: 'PUT',
    value: 'PUT'
  },
  {
    label: 'DELETE',
    value: 'DELETE'
  },
  {
    label: 'PATCH',
    value: 'PATCH'
  },
  {
    label: 'HEAD',
    value: 'HEAD'
  },
  {
    label: 'OPTIONS',
    value: 'OPTIONS'
  }
]
const saveOptions = [
  {
    label: '复制衔接',
    key: 'copyLink'
  }
]

const sendOptions = [
  {
    label: '导入衔接',
    key: 'importURL'
  }
]
interface RequestOption {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD'
  url: string
  headers: Array<{ key: string; value: any }>
  params: Array<{ key: string; value: any }>
}
const formData = reactive<RequestOption>({
  method: 'GET',
  url: 'http://datav.byteportrait.com',
  headers: [
    {
      key: '',
      value: ''
    }
  ],
  params: [
    {
      key: '',
      value: ''
    }
  ]
})
const addParams = (index: number) => {
  formData.params.splice(index + 1, 0, { key: '', value: '' })
}
const removeParams = (index: number) => {
  formData.params.splice(index, 1)
}
</script>

<style scoped lang="less">
.api {
  display: flex;
  .method {
    width: 100px;
    flex: 8;
  }
  .url {
    flex: 90;
  }
}
</style>
