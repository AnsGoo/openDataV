import { ComponentGroup } from '@/enum'
import type { ComponentInfo, GroupType, ComponentOptions } from '@/types/component'
import crusher from '@/assets/img/crusher.png'
import belt from '@/assets/img/belt.png'
import bracket from '@/assets/img/bracket.png'
import coal from '@/assets/img/coal.png'
import pump from '@/assets/img/pump.png'
import shearer from '@/assets/img/shearer.png'
import reversed from '@/assets/img/reversed.png'
import emulsifiedBoosterPump from '@/assets/img/emulsifiedBoosterPump.png'
import emulsifiedPump from '@/assets/img/emulsifiedPump.png'
import waterBoosterPump from '@/assets/img/waterBoosterPump.png'
import waterPump from '@/assets/img/waterPump.png'

import belt_small from '@/assets/img/1.png'
import crusher_small from '@/assets/img/2.png'
import reversed_small from '@/assets/img/3.png'
import shearer_small from '@/assets/img/4.png'
import coal_small from '@/assets/img/5.png'
import pump_small from '@/assets/img/6.png'

const component: ComponentInfo = {
  component: 'Machine',
  label: '选择图片',
  group: ComponentGroup.MACHINEIMG,
  propValue: {
    name: shearer,
    borderColor: '#0266C6'
  },
  style: {
    width: 150,
    height: 150
  }
}
const style: Array<GroupType> = []
const attrs: Array<GroupType> = [
  {
    name: '基本配置',
    uid: 'basic',
    children: [
      {
        key: 'name',
        label: '选择图片',
        type: 'select',
        selectOptions: [
          { value: belt, label: '顺槽皮带' },
          { value: pump, label: '泵站' },
          { value: crusher, label: '破碎机' },
          { value: reversed, label: '转载机' },
          { value: shearer, label: '刮板运输机' },
          { value: coal, label: '采煤机' },
          { value: bracket, label: '支架' },
          { value: emulsifiedPump, label: '乳化泵' },
          { value: emulsifiedBoosterPump, label: '乳化增压泵' },
          { value: waterPump, label: '清水泵' },
          { value: waterBoosterPump, label: '清水增压泵' },
          { value: belt_small, label: '顺槽皮带_小' },
          { value: pump_small, label: '泵站_小' },
          { value: crusher_small, label: '破碎机_小' },
          { value: reversed_small, label: '转载机_小' },
          { value: shearer_small, label: '刮板运输机_小' },
          { value: coal_small, label: '采煤机_小' }
        ]
      },
      {
        key: 'borderColor',
        label: '边框颜色',
        type: 'color'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
