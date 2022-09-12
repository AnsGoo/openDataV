import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'FlvVideo'
class FlvVideoComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BASIC,
      name: name ? name : '视频',
      id,
      width: 400,
      height: 225
    })
  }

  _prop: PropsType[] = [
    {
      label: '视频配置',
      prop: 'basic',
      children: [
        {
          prop: 'url',
          label: '视频地址',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue:
              'https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/181004_04_Dolphins-Whale_06_preview.webm'
          }
        },
        {
          prop: 'videoType',
          label: '视频类型',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: 'webm'
          }
        },
        {
          prop: 'controls',
          label: '控制器',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: true
          }
        },
        {
          prop: 'autoplay',
          label: '自动播放',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: true
          }
        },
        {
          prop: 'muted',
          label: '静音',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: true
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default FlvVideoComponent
