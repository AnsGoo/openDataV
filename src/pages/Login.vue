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
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="formData"
        @submit.prevent
        :show-message="true"
      >
        <div class="tip">登陆</div>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            style="width: 100%; min-width: 360px"
            v-model="formData.username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            style="width: 100%; min-width: 360px"
            v-model="formData.password"
            @keydown.enter="loginAction"
          />
        </el-form-item>
        <el-button type="primary" style="min-width: 360px; width: 100%" @click="loginAction"
          >登陆</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { reactive, ref } from 'vue'

import { login } from '@/api/user'
import { LoginData } from '@/types/user'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import type { Router, RouteLocationNormalizedLoaded as Route } from 'vue-router'
import { UserInfo } from '@/types/storeTypes'
import { errorMessage, successMessage } from '@/utils/message'

const userStore = useUserStoreWithOut()
const router: Router = useRouter()
const route: Route = useRoute()

const ruleFormRef = ref<InstanceType<typeof ElForm>>()

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
      successMessage('登陆成功')
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
      errorMessage(`登陆失败,请输入正确的账号密码`)
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
    .name {
      color: #ffff;
      font-size: 40px;
      font-weight: bold;
      margin-left: 10%;
      min-height: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
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
