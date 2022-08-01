import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { FlvVideo } from './type'

const component: ComponentConfig<FlvVideo> = {
  component: 'FlvVideo',
  group: ComponentGroup.BASIC,
  label: 'FLV视频',
  propValue: {
    url: 'https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/181004_04_Dolphins-Whale_06_preview.webm',
    videoType: 'webm',
    controls: true,
    autoplay: true,
    muted: true
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
      },
      {
        key: 'controls',
        label: '控制器',
        type: 'switch'
      },
      {
        key: 'autoplay',
        label: '自动播放',
        type: 'switch'
      },
      {
        key: 'muted',
        label: '静音',
        type: 'switch'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
