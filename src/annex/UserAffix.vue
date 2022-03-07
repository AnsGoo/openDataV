<template>
  <div class="login-affix">
    <div class="box">
      <div class="circle center" @click="handlerShow">
        <span>{{ username.toUpperCase()[0] }}</span>
      </div>
      <div circle class="circle item logout" @click="logout" v-show="isShow">
        <span class="iconfont icon-kaiguan"></span>
      </div>
      <div circle class="circle item setting" v-show="isShow" @click="toPath('Setting')">
        <span class="iconfont icon-leijianzhuxiulix"></span>
      </div>
      <div circle class="circle item home" v-show="isShow" @click="toPath('Home')">
        <span class="iconfont icon-shouye-moren"></span>
      </div>
      <div circle class="circle item page" v-show="isShow" @click="toPath('Pages')">
        <span class="iconfont icon-liebiao"></span>
      </div>
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
  position: fixed;
  left: calc(100% - 100px);
  top: calc(100% - 120px);
  z-index: 9999;

  .box {
    position: relative;
    // transition: 0s display;

    // &:hover .item{
    //   display: block;
    //   transition-delay:10s;
    // }
    .circle {
      position: absolute;
      border-radius: 50%;
      border-color: #409eff;
      border-width: 1px;
      height: 40px;
      width: 40px;
      background: #409eff;
      color: #fff;
      vertical-align: middle;
      text-align: center;

      & span {
        width: 100%;
        height: 100%;
        line-height: 40px;
      }
      &.center {
        top: 0;
        left: 0;
        border-radius: 50%;
        border-width: 1px;
      }
      &.logout {
        top: -60px;
        left: 0px;
      }

      &.setting {
        top: -30px;
        left: -46px;
      }

      &.home {
        top: 30px;
        left: -46px;
      }

      &.page {
        top: 60px;
        left: 0px;
      }
    }
  }
}
</style>
