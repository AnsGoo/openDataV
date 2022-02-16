import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

export interface SwiperItem {
  label: string
  img: string
  link: string
}

export interface PropValueType {
  slidesPerView: number
  spaceBetween: number
  textAlgin: string
  swiperList: Array<SwiperItem>
}

const component: ComponentInfo<PropValueType> = {
  component: 'Navigation3',
  group: ComponentGroup.Navigation,
  label: '导航3',
  propValue: {
    slidesPerView: 3,
    spaceBetween: 5,
    textAlgin: 'center',
    swiperList: []
  },
  icon: 'line',
  style: {
    width: 240,
    height: 150,
    fontSize: 12,
    color: 'rgba(0, 206, 209, 1)',
    fontWeight: 700
  }
}

const style: Array<GroupType> = [
  {
    name: '字体配置',
    uid: 'font',
    children: [
      {
        key: 'fontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'fontWeight',
        label: '字体粗细',
        type: 'number'
      },
      {
        key: 'color',
        label: '字体颜色',
        type: 'color'
      }
    ]
  }
]

const attrs: Array<GroupType> = [
  {
    name: '导航配置',
    uid: 'navigation',
    children: [
      {
        key: 'slidesPerView',
        label: '显示数量(奇数)',
        type: 'number'
      },
      {
        key: 'spaceBetween',
        label: '间距',
        type: 'number'
      },
      {
        key: 'textAlgin',
        label: '文本位置',
        type: 'select',
        selectOptions: [
          { label: '顶部', value: 'top' },
          { label: '中心', value: 'center' }
        ]
      }
    ]
  },
  {
    name: '路由',
    uid: 'swiperList',
    max: 20,
    children: [
      {
        key: 'link',
        label: '地址',
        type: 'text'
      },
      {
        key: 'img',
        label: '图片',
        type: 'text'
      },
      {
        key: 'label',
        label: '名称',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
