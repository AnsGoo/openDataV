import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
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

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '视频配置',
    uid: 'video',
    children: [
      {
        key: 'url',
        label: '视频地址',
        type: FormType.TEXT
      },
      {
        key: 'videoType',
        label: '视频类型',
        type: FormType.TEXT
      },
      {
        key: 'controls',
        label: '控制器',
        type: FormType.SWITCH
      },
      {
        key: 'autoplay',
        label: '自动播放',
        type: FormType.SWITCH
      },
      {
        key: 'muted',
        label: '静音',
        type: FormType.SWITCH
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
