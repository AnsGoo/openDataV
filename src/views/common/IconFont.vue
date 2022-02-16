<template>
  <div>
    <teleport to="body">
      <div v-show="visible" class="tab-container" ref="iconDiv">
        <div class="total">图标数量：{{ iconList.length }}</div>
        <ul class="icon_lists">
          <li v-for="icon in iconList" :key="icon" class="dib" @click="handleClick(icon)">
            <span :class="`icon iconfont ${icon}`"></span>
          </li>
        </ul>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { copyText } from '@/utils/utils'
import { successMessage } from '@/utils/message'
import { onClickOutside } from '@vueuse/core'

const iconList = reactive<string[]>([
  'icon-zu',
  'icon-zhuxingtu',
  'icon-yibiaopan',
  'icon-tubiao-bingtu',
  'icon-tubiao-qiapian',
  'icon-tubiao-zhexiantu',
  'icon-anniuzu',
  'icon-daohang',
  'icon-liebiao',
  'icon-caimeiji',
  'icon-qita',
  'icon-dingzhi',
  'icon-jichu',
  'icon-chartt',
  'icon-zhuangshizhuangxiu',
  'icon-wenduji',
  'icon-tiaoxingjindutu',
  'icon-biankuang',
  'icon-jindutu',
  'icon-jinggao1',
  'icon-yujingdeng',
  'icon-zidongxitongjinggaodeng1',
  'icon-yujing1',
  'icon-yujing3',
  'icon-jinggaodeng',
  'icon-baojing1',
  'icon-hong',
  'icon-yujingdeng1',
  'icon-a-baojingjinggaoyujingjinggaodeng',
  'icon-light',
  'icon-gaojingdeng9',
  'icon-jinggaodeng1',
  'icon-yujing5',
  'icon-shanchu',
  'icon-shanchu1',
  'icon-shouye',
  'icon-chakan',
  'icon-bianji',
  'icon-fuzhi',
  'icon-shouye-moren',
  'icon-jiesuo',
  'icon-xuanzhuan',
  'icon-kaiguan',
  'icon-clock',
  'icon-fankuixinxi',
  'icon-leijianzhuxiulix',
  'icon-weibiaoti-',
  'icon-sds_di37leijianzhuxiuli',
  'icon-liandongkongzhi',
  'icon-unlock-full',
  'icon-ascend',
  'icon-falling',
  'icon-buttonoff',
  'icon-buttonon',
  'icon-jiantoushang',
  'icon-jiantouyou',
  'icon-jiantouxia',
  'icon-24gl-next',
  'icon-24gl-pauseCircle',
  'icon-24gl-previous',
  'icon-24gl-stopCircle',
  'icon-anniu_kaiqi',
  'icon-anniu_guanbi',
  'icon-jiantoushangzuo-copy',
  'icon-xiangzuo2-copy',
  'icon-guanbibofang',
  'icon-xiangshang3',
  'icon-xiangxia5',
  'icon-xiangyou2',
  'icon-youbofang',
  'icon-zuobofang',
  'icon-bofang2',
  'icon-bofang5',
  'icon-xiangzuojiaohuan',
  'icon-xiangyoujiaohuan',
  'icon-bofang6',
  'icon-24gl-playCircle',
  'icon-xiangshang7',
  'icon-bofang26',
  'icon-play1',
  'icon-bofang-kuaitui',
  'icon-bofang09',
  'icon-bofang-kuaijin',
  'icon-xiangxia7'
])

defineProps<{
  visible: boolean
}>()

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const iconDiv = ref<ElRef>(null)

onClickOutside(iconDiv, () => {
  emits('update:visible', false)
})

const handleClick = (icon: string) => {
  copyText(icon)
  successMessage(`复制图标: ${icon}`)
}
</script>

<style lang="less" scoped>
.tab-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  z-index: 1000;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px 5px #ccc;

  .total {
    text-align: center;
  }
}

.icon_lists {
  width: 100% !important;
  overflow: hidden;
  *zoom: 1;
  display: flex;
  flex-wrap: wrap;
}

.icon_lists li {
  width: 50px;
  text-align: center;
  list-style: none !important;
  cursor: default;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.5);
  }

  &:active {
    transform: scale(1);
  }
}

.icon_lists .icon {
  display: block;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  margin: 10px auto;
  color: #333;
  -webkit-transition: font-size 0.25s linear, width 0.25s linear;
  -moz-transition: font-size 0.25s linear, width 0.25s linear;
  transition: font-size 0.25s linear, width 0.25s linear;
}
</style>
