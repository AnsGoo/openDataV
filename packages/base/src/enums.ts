export enum DataMode {
  SELF = 'SELF',
  UNIVERSAL = 'UNIVERSAL',
  GLOBAL = 'GLOBAL'
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

export enum Event {
  ComponentPropChange = 'component:prop',
  ComponentStyleChange = 'component:style',
  ComponentCreate = 'component:create',
  ComponentDestory = 'component:destory',
  ComponentResize = 'component:resize'
}
export const GlobalColorSwatches = ['#FFFFFF', '#18A058', '#2080F0', '#F0A020', '#D03050FF']
