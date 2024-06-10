import { FormType } from '@open-data-v/base'

export default {
  style: () => [],
  propValue: () => [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'colorLeft',
          label: '边框颜色1',
          type: FormType.COLOR,
          props: {
            defaultValue: '#4fd2dd'
          }
        },
        {
          prop: 'colorRight',
          label: '边框颜色2',
          type: FormType.COLOR,
          props: {
            defaultValue: '#235fa7'
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormType.COLOR,
          props: {
            defaultValue: 'transparent'
          }
        }
      ]
    }
  ]
}
