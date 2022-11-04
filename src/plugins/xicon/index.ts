// https://iconpark.bytedance.com/official

import type { App } from 'vue'
import XIcon from './XIcon.vue'

export { XIcon }

import {
  Delete,
  Save,
  ZAxis,
  ProgressBarRound,
  Template,
  Layers,
  DataBin,
  Moon,
  Sun,
  TextIndentLess,
  TextIndentMore,
  DataBase,
  TextAnnotationToggle
} from '@vicons/carbon'
import {
  EyeTracking20Regular,
  EyeTrackingOff20Regular,
  ArrowStepBack20Regular,
  ArrowStepOver20Regular,
  FullScreenMaximize20Regular,
  Settings20Regular,
  PanelRightExpand20Regular,
  PanelLeftExpand20Regular,
  Component2DoubleTapSwipeUp24Filled,
  DocumentOnePage20Regular,
  TextEditStyle20Regular,
  Games20Regular,
  BorderNone20Regular,
  ArrowClockwiseDashes20Filled,
  ArrowTrendingLines20Regular,
  DataHistogram20Regular,
  DataPie20Regular
} from '@vicons/fluent'

import {
  ClearOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  HomeOutlined,
  LogoutOutlined,
  PictureOutlined
} from '@vicons/antd'

import { AddChartSharp } from '@vicons/material'

import { CubeOutline } from '@vicons/ionicons5'

export default {
  install(app: App) {
    // 插入元素
    app.component('XIcon', XIcon)
    app.component('XIconDeleteOne', Delete)
    app.component('XIconPreviewOpen', EyeTracking20Regular)
    app.component('XIconPreviewCloseOne', EyeTrackingOff20Regular)
    app.component('XIconBack', ArrowStepBack20Regular)
    app.component('XIconNext', ArrowStepOver20Regular)
    app.component('XIconClear', ClearOutlined)
    app.component('XIconDownloadOne', CloudDownloadOutlined)
    app.component('XIconUploadOne', CloudUploadOutlined)
    app.component('XIconSaveOne', Save)
    app.component('XIconCones', ZAxis)
    app.component('XIconFullScreen', FullScreenMaximize20Regular)
    app.component('XIconLoading', ProgressBarRound)
    app.component('XIconSetting', Settings20Regular)
    app.component('XIconHome', HomeOutlined)
    app.component('XIconLogout', LogoutOutlined)
    app.component('XIconPageTemplate', Template)
    app.component('XIconPicture', PictureOutlined)
    app.component('XIconExpandLeft', PanelLeftExpand20Regular)
    app.component('XIconExpandRight', PanelRightExpand20Regular)
    app.component('XIconComponents', Component2DoubleTapSwipeUp24Filled)
    app.component('XIconLayers', Layers)
    app.component('XIconPage', DocumentOnePage20Regular)
    app.component('XIconTextStyle', TextEditStyle20Regular)
    app.component('XIconInternalData', DataBin)
    app.component('XIconGamePs', Games20Regular)
    app.component('XIconSun', Sun)
    app.component('XIconMoon', Moon)
    app.component('XIconTextIndentLess', TextIndentLess)
    app.component('XIconTextIndentMore', TextIndentMore)
    app.component('XIconData', DataBase)
    app.component('XIconAddThree', AddChartSharp)
    app.component('XIconCubeOutline', CubeOutline)
    app.component('XIconText', TextAnnotationToggle)
    app.component('XIconRectangle', BorderNone20Regular)
    app.component('XIconRotation', ArrowClockwiseDashes20Filled)
    app.component('XIconChartLine', ArrowTrendingLines20Regular)
    app.component('XIconChartHistogram', DataHistogram20Regular)
    app.component('XIconChartPie', DataPie20Regular)
  }
}
