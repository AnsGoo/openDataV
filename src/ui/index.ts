import { NColorPicker, NForm, NFormItem, NInputGroup, NInputNumber, NSelect } from 'naive-ui'

import { Button, ButtonGroup } from './Button'
import Card from './Card'
import { Collapse, CollapsePanel } from './Collapse'
import Divider from './Divider'
import Icon from './Icon'
import { Input } from './Input'
import type { MenuOption } from './Menu'
import { Menu } from './Menu'
import Modal from './Modal'
import { Radio, RadioGroup } from './Radio'
import Slider from './Slider'
import Switch from './Switch'
import { TabPane, Tabs } from './Tabs'
import Tooltip from './Tooltip'
import type { SelectOption } from './type'

const OInput = Input
const OSelect = NSelect
const OTabPane = TabPane
const OTabs = Tabs
const OMenu = Menu
const OForm = NForm
const OFormItem = NFormItem
const OColorPicker = NColorPicker
const OButton = Button
const OCard = Card
const OInputGroup = NInputGroup
const OInputNumber = NInputNumber
const OModal = Modal
const ORadio = Radio
const ORadioGroup = RadioGroup
const OSwitch = Switch
const OCollapse = Collapse
const OCollapseItem = CollapsePanel
const ODivider = Divider
const OTooltip = Tooltip
const OButtonGroup = ButtonGroup

const OSlider = Slider
const OIcon = Icon

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
  OIcon,
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
