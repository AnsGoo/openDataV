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
  PREVIEW = 'preview'
}

// 报警类型
export enum AlarmType {
  // 超限报警
  ALARM_OVER = 1,
  // 状态报警
  ALARM_STATE = 2
}

// 报警级别
export enum AlarmLevel {
  // 一般
  NotUrgent = 0,
  // 紧急
  Urgent = 1,
  // 严重
  VeryUrgent = 2
}

export enum ComponentGroup {
  //机器图片
  MACHINEIMG = '机器图片',
  // 基础组件
  BASIC = '基础',
  // 边框
  BORDER = '边框',
  // 装饰
  DECORATION = '装饰',
  // 折线图
  LINE = '折线图',
  // 柱状图
  BAR = '柱状图',
  // 百分比图
  PERCENTAGE = '百分比图',
  //一键启停
  STARTSTOP = '启停按钮',
  // 仪表盘
  GAUGE = '仪表盘',
  // 定制组件
  CUSTOM = '定制组件',
  TEXT = '文本',
  SWITCH = '开关',
  // 其他组件
  Navigation = '导航',
  Progress = '进度图',
  Thermometer = '温度计',
  // 其他组件
  OTHER = '其他'
}

export enum ControlType {
  //带有图片的下拉框
  IMGSELECT = 'imgSelect',
  // 文本框
  TEXT = 'text',
  // 文本域，多行文本属性
  TEXTAREA = 'textarea',
  // 数值框
  NUMBER = 'number',
  // 下拉选择框，需要固定值的属性，防止人员填写错误
  SELECT = 'select',
  // 颜色选择框，颜色相关的属性使用
  COLOR = 'color',
  // 单选框
  RADIO = 'radio',
  // 开关，主要为 true、false 值使用
  SWITCH = 'switch'
}

export enum EChartTypeEnum {
  // 折线图
  LINE = 'line',
  // 柱状图
  BAR = 'bar',
  // 饼图
  PIE = 'pie'
}
