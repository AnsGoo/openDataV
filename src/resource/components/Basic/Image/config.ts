import { ComponentGroup } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
const component: ComponentConfig = {
  component: 'Image',
  group: ComponentGroup.BASIC,
  label: '图片',
  icon: 'wenben',
  propValue: {},
  style: {
    width: 150,
    height: 150,
    backgroundColor: 'skyblue',
    backgroundRepeat: 'round',
    backgroundSize: 'cover'
  }
}

const style: Array<PropsType> = [
  {
    name: '背景设置',
    uid: 'background',
    children: [
      {
        key: 'backgroundColor',
        label: '背景色',
        type: 'color'
      },
      {
        key: 'backgroundImage',
        label: '背景图片',
        type: 'text'
      },
      {
        key: 'backgroundRepeat',
        label: '背景填充',
        type: 'select',
        componentOptions: {
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
        key: 'backgroundAttachment',
        label: '背景附着',
        type: 'select',
        componentOptions: {
          options: [
            { value: 'fixed', label: '固定位置' },
            { value: 'scroll', label: '不滚动' },
            { value: 'local', label: '默认' }
          ]
        }
      },
      {
        key: 'backgroundPosition',
        label: '背景位置',
        type: 'select',
        componentOptions: {
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
        key: 'backgroundSize',
        label: '背景尺寸',
        type: 'select',
        componentOptions: {
          options: [
            { value: 'auto', label: '真实大小' },
            { value: 'cover', label: '等比例缩放' },
            { value: 'contain', label: '单边缩放置容器大小' }
          ]
        }
      },
      {
        key: 'linearGradient',
        label: '背景渐变',
        type: 'linearGradient'
      }
    ]
  }
]

const attrs: Array<PropsType> = []

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
