/*
这里记录通用的枚举类型
*/

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum TokenStorage {
  LOCALSTORAGE = 'localStorage',
  SESSIONSTORAGE = 'sessionStorage',
  MEMORYSTORAGE = 'memoryStorage'
}

export enum RouteMode {
  HISTORY = 'history',
  HASH = 'hash'
}

export enum NoAuth {
  NO_AUTH = 'NoAuth',
  AUTH = 'Auth'
}

export const LOGIN_URL = '/login'

export enum EditMode {
  EDIT = 'edit',
  PREVIEW = 'preview',
  VIEW = 'view'
}

export class GroupType {
  public name: string
  private _icon: string
  public key: string

  constructor(name: string, key: string, icon: string) {
    this.name = name
    this._icon = icon
    this.key = key
  }
  get icon() {
    return this._icon
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .slice(1)
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
  OTHER = 'OTHER'
}

export const ComponentGroupList: GroupType[] = [
  new GroupType('基础', ComponentGroup.BASIC, 'CubeThree'),
  new GroupType('边框', ComponentGroup.BORDER, 'Rectangle'),
  new GroupType('装饰', ComponentGroup.DECORATION, 'Headwear'),
  new GroupType('线状图', ComponentGroup.LINE, 'ChartLine'),
  new GroupType('柱状图', ComponentGroup.BAR, 'ChartHistogram'),
  new GroupType('饼图', ComponentGroup.PIE, 'ChartPie'),
  new GroupType('地图', ComponentGroup.MAP, 'Earth'),
  new GroupType('仪表盘', ComponentGroup.GAUGE, 'Dashboard'),
  new GroupType('按钮', ComponentGroup.BUTTON, 'SwitchButton'),
  new GroupType('文本', ComponentGroup.TEXT, 'Text'),
  new GroupType('表格', ComponentGroup.TABLE, 'TableFile'),
  new GroupType('温度计', ComponentGroup.THERMOMETER, 'Thermometer'),
  new GroupType('导航', ComponentGroup.NAVIFATION, 'HamburgerButton'),
  new GroupType('进度图', ComponentGroup.PROGERSS, 'LoadingThree'),
  new GroupType('其他', ComponentGroup.OTHER, 'MoreFour')
]

export enum FormType {
  // 文本框
  TEXT = 'text',
  // 文本域，多行文本属性
  TEXTAREA = 'textarea',
  // 数值框
  NUMBER = 'number',
  // 下拉选择框，需要固定值的属性，防止人员填写错误
  SELECT = 'NSelect',
  // 颜色选择框，颜色相关的属性使用
  COLOR = 'NColorPicker',
  // 单选框
  RADIO = 'radio',
  // 开关，主要为 true、false 值使用
  SWITCH = 'NSwitch',
  //  字体选择
  FONT_STYLE = 'FontStyle',
  //  字重选择
  FONT_WEIGHT = 'FontWeight',
  // 背景色渐变选择
  LINEAR_GRADIENT = 'LinearGradient',
  // 自定义
  CUSTOM = 'custom',
  // 数组框
  ARRAY = 'array',
  // 背景
  BACKGROUND = 'BackItem'
}

export enum EChartTypeEnum {
  // 折线图
  LINE = 'line',
  // 柱状图
  BAR = 'bar',
  // 饼图
  PIE = 'pie'
}

export enum ScriptType {
  // json
  Python = 'Python',
  // form-data qs
  Javascript = 'Javascript'
}

export const GlobalColorSwatches = ['#FFFFFF', '#18A058', '#2080F0', '#F0A020', '#D03050FF']
