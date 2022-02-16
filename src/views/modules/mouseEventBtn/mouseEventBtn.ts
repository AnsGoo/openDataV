import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'mouseEventBtn',
  label: '鼠标事件按钮',
  group: ComponentGroup.STARTSTOP,
  propValue: {
    url: '/Scan/WritePoint',
    tagName: 'CMJ_ZDHQDXNTZ',
    upValue: 0,
    downValue: 1,
    fontClass: 'icon iconfont icon-youbofang',
    fontColor: 'yellow',
    fontSize: '60'
  },
  style: {
    width: 80,
    height: 80
  }
}
const style: Array<GroupType> = []
const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: [
      {
        key: 'fontClass',
        label: '按钮样式',
        type: 'imgSelect',
        selectOptions: [
          { value: 'icon iconfont icon-24gl-previous', label: 'icon iconfont icon-24gl-previous' },
          {
            value: 'icon iconfont icon-24gl-pauseCircle',
            label: 'icon iconfont icon-24gl-pauseCircle'
          },
          { value: 'icon iconfont icon-24gl-previous', label: 'icon iconfont icon-24gl-previous' },
          {
            value: 'icon iconfont icon-24gl-stopCircle',
            label: 'icon iconfont icon-24gl-stopCircle'
          },
          {
            value: 'icon iconfont icon-jiantoushangzuo-copy',
            label: 'icon iconfont icon-jiantoushangzuo-copy'
          },
          {
            value: 'icon iconfont icon-xiangzuo2-copy',
            label: 'icon iconfont icon-xiangzuo2-copy'
          },
          { value: 'icon iconfont icon-guanbibofang', label: 'icon iconfont icon-guanbibofang' },
          { value: 'icon iconfont icon-xiangshang3', label: 'icon iconfont icon-xiangshang3' },
          { value: 'icon iconfont icon-xiangxia5', label: 'icon iconfont icon-xiangxia5' },
          { value: 'icon iconfont icon-xiangyou2', label: 'icon iconfont icon-xiangyou2' },
          { value: 'icon iconfont icon-youbofang', label: 'icon iconfont icon-youbofang' },
          { value: 'icon iconfont icon-zuobofang', label: 'icon iconfont icon-zuobofang' },
          { value: 'icon iconfont icon-bofang2', label: 'icon iconfont icon-bofang2' },
          { value: 'icon iconfont icon-bofang5', label: 'icon iconfont icon-bofang5' },
          {
            value: 'icon iconfont icon-xiangzuojiaohuan',
            label: 'icon iconfont icon-xiangzuojiaohuan'
          },
          {
            value: 'icon iconfont icon-xiangyoujiaohuan',
            label: 'icon iconfont icon-xiangyoujiaohuan'
          },
          { value: 'icon iconfont icon-bofang6', label: 'icon iconfont icon-bofang6' },
          {
            value: 'icon iconfont icon-24gl-playCircle',
            label: 'icon iconfont icon-24gl-playCircle'
          },
          { value: 'icon iconfont icon-xiangshang7', label: 'icon iconfont icon-xiangshang7' },
          { value: 'icon iconfont icon-bofang26', label: 'icon iconfont icon-bofang26' },
          { value: 'icon iconfont icon-play1', label: 'icon iconfont icon-play1' },
          {
            value: 'icon iconfont icon-bofang-kuaitui',
            label: 'icon iconfont icon-bofang-kuaitui'
          },
          { value: 'icon iconfont icon-bofang09', label: 'icon iconfont icon-bofang09' },
          {
            value: 'icon iconfont icon-bofang-kuaijin',
            label: 'icon iconfont icon-bofang-kuaijin'
          },
          { value: 'icon iconfont icon-xiangxia7', label: 'icon iconfont icon-xiangxia7' }
        ]
      },
      {
        key: 'fontSize',
        label: '按钮大小',
        type: 'number'
      },
      {
        key: 'fontColor',
        label: '按钮颜色',
        type: 'color'
      }
    ]
  },
  {
    name: '数据项配置',
    uid: 'datas',
    children: [
      {
        key: 'url',
        label: '提交地址',
        type: 'text'
      },
      {
        key: 'tagName',
        label: 'path点',
        type: 'text'
      },
      {
        key: 'downValue',
        label: '按下按钮发送的值',
        type: 'number'
      },
      {
        key: 'upValue',
        label: '抬起按钮发送的值',
        type: 'number'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
