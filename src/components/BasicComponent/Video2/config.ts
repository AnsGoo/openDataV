import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'

const component: ComponentConfig = {
  component: 'FlvVideo',
  group: ComponentGroup.BASIC,
  label: 'FLV视频',
  propValue: {
    url: 'https://www.w3school.com.cn/i/movie.ogg',
    videoType: 'flv'
  },
  icon: 'line',
  style: {
    width: 320,
    height: 240
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
        key: 'videoType',
        label: '视频类型',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
