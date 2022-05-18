<template>
  <div class="login-affix">
    <div class="box" v-if="isShow">
      <div class="circle item" @click="logout">
        <span class="iconfont icon-kaiguan"></span>
      </div>
      <div class="circle item" @click="toPath('Setting')">
        <span class="iconfont icon-leijianzhuxiulix"></span>
      </div>
      <div class="circle item" @click="toPath('Home')">
        <span class="iconfont icon-shouye-moren"></span>
      </div>
      <div class="circle item" @click="toPath('Pages')">
        <span class="iconfont icon-liebiao"></span>
      </div>
    </div>
    <div class="circle center" @click="handlerShow">
      <span>{{ username.toUpperCase()[0] || 'A  ' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStoreWithOut } from '@/store/modules/user'
import { computed, ref } from 'vue'
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'

const router: Router = useRouter()
const userStore = useUserStoreWithOut()
const username = computed<string>(() => userStore.userName)

const isShow = ref<boolean>(false)

const logout = () => {
  userStore.logout()
  toPath('Home')
}

const toPath = (pathName: string): void => {
  isShow.value = false
  router.push({
    name: pathName
  })
}

const handlerShow = () => {
  isShow.value = !isShow.value
}
</script>
<style scoped lang="less">
.login-affix {
  position: absolute;
  left: calc(100% - 100px);
  bottom: 10px;
  z-index: 9999;

  .center {
    position: absolute;
    bottom: 10px;
  }

  .box {
    position: absolute;
    bottom: 60px;
    overflow: hidden;

    .item {
      & span {
        width: 100%;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}

.circle {
  border-radius: 50%;
  border-color: #409eff;
  border-width: 1px;
  height: 40px;
  width: 40px;
  line-height: 40px;
  background: #409eff;
  color: #fff;
  vertical-align: middle;
  text-align: center;
  margin: 10px 0;
}
</style>
