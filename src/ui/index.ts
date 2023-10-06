import {
  NColorPicker,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NInputNumber,
  NMenu,
  NModal,
  NRadio,
  NRadioGroup,
  NSelect
} from 'naive-ui'

import { Button, ButtonGroup } from './Button'
import Card from './Card'
import { Collapse, CollapsePanel } from './Collapse'
import Divider from './Divider'
import Slider from './Slider'
import Switch from './Switch'
import { TabPane, Tabs } from './Tabs'
import Tooltip from './Tooltip'
import type { MenuOption, SelectOption } from './type'

const OInput = NInput
const OSelect = NSelect
const OTabPane = TabPane
const OTabs = Tabs
const OMenu = NMenu
const OForm = NForm
const OFormItem = NFormItem
const OColorPicker = NColorPicker
const OButton = Button
const OCard = Card
const OInputGroup = NInputGroup
const OInputNumber = NInputNumber
const OModal = NModal
const ORadio = NRadio
const ORadioGroup = NRadioGroup
const OSwitch = Switch
const OCollapse = Collapse
const OCollapseItem = CollapsePanel
const ODivider = Divider
const OTooltip = Tooltip
const OButtonGroup = ButtonGroup

const OSlider = Slider

export type { MenuOption, SelectOption }

export {
  OButton,
  OButtonGroup,
  OCard,
  OCollapse,
  OCollapseItem,
  OColorPicker,
  ODivider,
  OForm,
  OFormItem,
  OInput,
  OInputGroup,
  OInputNumber,
  OMenu,
  OModal,
  ORadio,
  ORadioGroup,
  OSelect,
  OSlider,
  OSwitch,
  OTabPane,
  OTabs,
  OTooltip
}
