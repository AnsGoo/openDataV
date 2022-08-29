import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Image'
export class ImageComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BASIC,
      name: name ? name : '图片',
      id,
      width: 200,
      height: 200
    })
  }

  _prop: PropsType[] = []
  _style: PropsType[] = [
    {
      label: '背景设置',
      prop: 'background',
      children: [
        {
          prop: 'backgroundColor',
          label: '背景色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: 'skyblue'
          }
        },
        {
          prop: 'backgroundImage',
          label: '背景图片',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: ''
          }
        },
        {
          prop: 'backgroundRepeat',
          label: '背景填充',
          type: FormType.SELECT,
          componentOptions: {
            defaultValue: 'round',
            options: [
              { value: 'repeat-x', label: '横向平铺' },
              { value: 'repeat-y', label: '纵向平铺' },
              { value: 'repeat', label: '横向纵向平铺' },
              { value: 'no-repeat', label: '不平铺' },
              { value: 'round', label: '自动充满容器' },
              { value: 'space', label: '宽高等比例缩放只充满容器' }
            ]
          }
        },
        {
          prop: 'backgroundAttachment',
          label: '背景附着',
          type: FormType.SELECT,
          componentOptions: {
            defaultValue: 'local',
            options: [
              { value: 'fixed', label: '固定位置' },
              { value: 'scroll', label: '不滚动' },
              { value: 'local', label: '默认' }
            ]
          }
        },
        {
          prop: 'backgroundPosition',
          label: '背景位置',
          type: FormType.SELECT,
          componentOptions: {
            defaultValue: 'center',
            options: [
              { value: 'center', label: '水平垂直居中' },
              { value: 'left', label: '左对齐' },
              { value: 'right', label: '右对齐' },
              { value: 'top', label: '上对齐' },
              { value: 'bottom', label: '下对齐' }
            ]
          }
        },
        {
          prop: 'backgroundSize',
          label: '背景尺寸',
          type: FormType.SELECT,
          componentOptions: {
            defaultValue: 'cover',
            options: [
              { value: 'auto', label: '真实大小' },
              { value: 'cover', label: '等比例缩放' },
              { value: 'contain', label: '单边缩放置容器大小' }
            ]
          }
        },
        {
          prop: 'linearGradient',
          label: '背景渐变',
          type: FormType.LINEAR_GRADIENT,
          componentOptions: {
            defaultValue: {
              angle: 0,
              color1: '',
              color2: ''
            }
          }
        }
      ]
    }
  ]
}

export default ImageComponent
