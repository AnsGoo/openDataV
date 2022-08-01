<template>
  <div class="login">
    <div class="left">
      <div class="name">
        <span><img class="logo" src="/favicon.ico" /></span>
        <span> OPenDataV</span>
      </div>
      <img class="home" src="/home.png" />
      <div class="desc">
        <span>最具智能化数据可视化平台</span>
      </div>
    </div>
    <div class="right">
      <n-form
        ref="ruleFormRef"
        :rules="rules"
        :model="formData"
        @submit.prevent
        :show-message="true"
      >
        <div class="tip">登陆</div>
        <n-form-item prop="username">
          <n-input
            placeholder="请输入用户名"
            style="width: 100%; min-width: 360px"
            v-model="formData.username"
          />
        </n-form-item>
        <n-form-item prop="password">
          <n-input
            placeholder="请输入密码"
            style="width: 100%; min-width: 360px"
            type="password"
            v-model="formData.password"
            @keydown.enter="loginAction"
          />
        </n-form-item>
        <n-button type="primary" style="min-width: 360px; width: 100%" @click="loginAction"
          >登陆</n-button
        >
      </n-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { reactive, ref } from 'vue'

import { login } from '@/api/user'
import { LoginData } from '@/types/user'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import type { Router, RouteLocationNormalizedLoaded as Route } from 'vue-router'
import { UserInfo } from '@/types/storeTypes'
import { message } from '@/utils/message'

const userStore = useUserStoreWithOut()
const router: Router = useRouter()
const route: Route = useRoute()

const ruleFormRef = ref<InstanceType<typeof NForm>>()

const formData = reactive<{
  username: string
  password: string
}>({
  username: '',
  password: ''
})

const rules = reactive<{
  username: Recordable<any>[]
  password: Recordable<any>[]
}>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const loginAction = async () => {
  try {
    await ruleFormRef.value?.validate()
    const data: LoginData = { ...formData }
    try {
      const resp: UserInfo = await login(data)
      userStore.setUserInfo(resp)
      message.success('登陆成功')
      const redirect: string | undefined = route.query.redirect as string | undefined
      if (redirect) {
        router.push({
          path: redirect
        })
      } else {
        router.push({
          name: 'Pages'
        })
      }
    } catch (e: any) {
      message.error(`登陆失败,请输入正确的账号密码`)
    }
  } catch (e: unknown) {
    console.log(e)
  }
}
</script>

<style scoped lang="less">
.login {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 600px;
  height: 100vh;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 100%;
    background: radial-gradient(circle at 130% 40%, #80808024 30%, #2944b2 30%);
    align-items: center;
    .name {
      color: #ffff;
      font-size: 40px;
      font-weight: bold;
      min-height: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: self-start;
      margin-left: 10vh;
      .logo {
        width: 40px;
      }
    }
    .home {
      width: 60%;
      margin-left: 10%;
    }
    .desc {
      color: #ffff;
      font-size: 20px;
      align-self: self-start;
      margin-left: 10vh;
    }
  }
  .right {
    display: flex;
    height: 100%;
    width: 50%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 30% 40%, gray 30%, #80808024 30%);
    .tip {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #ffff;
    }
  }
}
</style>
