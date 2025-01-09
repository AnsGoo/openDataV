import bootstrap from './bootstrap'
import type { ToolBarItemType } from './components'
import { CodeEditor, Group, iconMap, Toggle, ToolBar, ToolBarItem, XIcon } from './components'
import { useIcon } from './components/xicon'
import { HOOKS } from './const'
import DemoDataPlugin from './data/demo-data'
import type { StoreComponentData } from './db'
import Editor from './editor'
import Shape from './editor/shape'
import { DataMode, EditMode } from './enum'
import { Container, useEmpty } from './modules'
import Canvas from './pages/designer/canvas.vue'
import Designer from './pages/designer/designer.vue'
import Previewer from './pages/perviewer/viewer.vue'
import {
  ComponentLayer,
  createAttrComponent,
  DrapComponent,
  useComponentActions,
  useComponentContextMenu
} from './panel/components'
import LeftSideBar from './panel/left-side-bar'
import RightSideBar from './panel/right-side-bar'
import ToolsBar from './panel/tools-bar'
import Directive from './plugins/directive'
import type { CanvasData, CanvasStyleData } from './state'
import {
  useCanvasState,
  useClipBoardState,
  useGraphState,
  useScriptState,
  useSnapshotState
} from './state'
import { useCanvasActions } from './toolbars'
import type { ContextmenuItem, RelativePosition } from './type'
import {
  createComponent,
  filterStyle,
  getComponentInstance,
  getComponentStyle,
  getInnerComponentShapeStyle,
  handleLogger,
  toPercent
} from './utils'

export {
  Canvas,
  CodeEditor,
  ComponentLayer,
  Container,
  createAttrComponent,
  createComponent,
  DataMode,
  DemoDataPlugin,
  Designer,
  Directive,
  DrapComponent,
  EditMode,
  Editor,
  filterStyle,
  getComponentInstance,
  getComponentStyle,
  getInnerComponentShapeStyle,
  Group,
  handleLogger,
  HOOKS,
  iconMap,
  LeftSideBar,
  Previewer,
  RightSideBar,
  Shape,
  Toggle,
  ToolBar,
  ToolBarItem,
  ToolsBar,
  toPercent,
  useCanvasActions,
  useCanvasState,
  useClipBoardState,
  useComponentActions,
  useComponentContextMenu,
  useEmpty,
  useGraphState,
  useIcon,
  useScriptState,
  useSnapshotState,
  XIcon
}
export type {
  CanvasData,
  CanvasStyleData,
  ContextmenuItem,
  RelativePosition,
  StoreComponentData,
  ToolBarItemType
}

export default { bootstrap }
