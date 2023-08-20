export enum DataMode {
  SELF = 'SELF',
  UNIVERSAL = 'UNIVERSAL',
  GLOBAL = 'GLOBAL'
}
export class GroupType {
  public name: string
  public icon: string
  public key: string

  constructor(name: string, key: string, icon: string) {
    this.name = name
    this.icon = icon
    this.key = key
  }
  public toJSON() {
    return {
      name: this.name,
      icon: this.icon,
      key: this.key
    }
  }
}

export enum ComponentGroup {
  // 基础组件
  BASIC = 'BASIC',
  // 边框
  BORDER = 'BORDER',
  // 装饰
  DECORATION = 'DECORATION',
  // 折线图
  LINE = 'LINE',
  // 柱状图
  BAR = 'BAR',
  // 百分比图
  PIE = 'PIE',
  // 地图
  MAP = 'MAP',
  // 仪表盘
  GAUGE = 'GAUGE',
  // 定制组件
  CUSTOM = 'CUSTOM',
  TEXT = 'TEXT',
  BUTTON = 'BUTTON',
  // 表格
  TABLE = 'TABLE',

  // 其他组件
  NAVIFATION = 'NAVIFATION',
  PROGERSS = 'PROGERSS',
  THERMOMETER = 'THERMOMETER',
  // 其他组件
  OTHER = 'OTHER',
  // 容器组件
  CONTAINER = 'CONTAINER'
}

export enum FormType {
  // 文本框
  TEXT = 'Text',
  // 文本域，多行文本属性
  TEXTAREA = 'Textarea',
  // 数值框
  NUMBER = 'Number',
  // 下拉选择框，需要固定值的属性，防止人员填写错误
  SELECT = 'Select',
  // 颜色选择框，颜色相关的属性使用
  COLOR = 'ColorPicker',
  // 单选框
  RADIO = 'Radio',
  CHECKBOX = 'Checkbox',
  // 开关，主要为 true、false 值使用
  SWITCH = 'Switch',
  //  字体选择
  FONT_STYLE = 'FontStyle',
  //  字重选择
  FONT_WEIGHT = 'FontWeight',
  // 背景色渐变选择
  LINEAR_GRADIENT = 'LinearGradient',
  // 自定义
  CUSTOM = 'Custom',
  // 数组框
  ARRAY = 'Array',
  // 背景
  BACKGROUND = 'BackItem',
  DATE = 'DatePicker',
  MODAL = 'Modal',
  TRANSFER = 'Transfer'
}
export enum ContainerType {
  FORM = 'Form',
  COLLAPSE = 'Collapse',
  CARD = 'Card',
  TIMELINE = 'Timeline'
}
export const GlobalColorSwatches = ['#FFFFFF', '#18A058', '#2080F0', '#F0A020', '#D03050FF']
