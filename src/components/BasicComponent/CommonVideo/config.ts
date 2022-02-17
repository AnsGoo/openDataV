import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentInfo = {
  component: 'CommonVideo',
  group: ComponentGroup.BASIC,
  label: '通用视频',
  propValue: {
    videoWidth: 320,
    videoHeight: 240,
    url: 'https://www.w3school.com.cn/i/movie.ogg',
    videoType: 'flv'
  },
  icon: 'line',
  style: {
    width: 50,
    height: 50
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '视频配置',
    uid: 'video',
    children: [
      {
        key: 'url',
        label: '视频地址',
        type: 'text'
      },
      {
        key: 'videoWidth',
        label: '视频宽度',
        type: 'number'
      },
      {
        key: 'videoHeight',
        label: '视频高度',
        type: 'number'
      },
      {
        key: 'videoType',
        label: '视频类型',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
