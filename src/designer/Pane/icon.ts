import { ComponentGroup } from '@/enum'

const iconMap: Recordable<string> = {
  [ComponentGroup.TEXT]: 'icon-bianji',
  [ComponentGroup.MACHINEIMG]: 'icon-caimeiji',
  [ComponentGroup.BASIC]: 'icon-jichu',
  [ComponentGroup.BORDER]: 'icon-biankuang',
  [ComponentGroup.DECORATION]: 'icon-zhuangshizhuangxiu',
  [ComponentGroup.LINE]: 'icon-tubiao-zhexiantu',
  [ComponentGroup.BAR]: 'icon-zhuxingtu',
  [ComponentGroup.PERCENTAGE]: 'icon-jindutu',
  [ComponentGroup.STARTSTOP]: 'icon-24gl-stopCircle',
  [ComponentGroup.GAUGE]: 'icon-yibiaopan',
  [ComponentGroup.CUSTOM]: 'icon-dingzhi',
  [ComponentGroup.SWITCH]: 'icon-anniuzu',
  [ComponentGroup.Navigation]: 'icon-daohang',
  [ComponentGroup.Thermometer]: 'icon-wenduji',
  [ComponentGroup.OTHER]: 'icon-qita',
  [ComponentGroup.Progress]: 'icon-tiaoxingjindutu'
}
export default iconMap
