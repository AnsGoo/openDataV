import type { ToolBarItemType } from './components'
import { CodeEditor, Group, iconMap, ToolBar, ToolBarItem, XIcon } from './components'
import { HOOKS } from './const'
import DemoDataPlugin from './data/demo-data'
import type { StoreComponentData } from './db'
import Editor from './editor'
import Shape from './editor/shape'
import { ComponentGroupList, DataMode, EditMode, GroupType, PixelEnum } from './enum'
import useComponentPlugin from './load-plugin'
import { Container, useEmpty } from './modules'
import Canvas from './pages/designer/canvas.vue'
import Designer from './pages/designer/designer.vue'
import Previewer from './pages/perviewer/viewer.vue'
import createAttrComponent from './pane/factory.tsx'
import LeftSideBar from './pane/left-side-bar'
import RightSideBar from './pane/right-side-bar'
import ToolsBar from './pane/tools-bar'
import Directive from './plugins/directive'
import type { CanvasData, CanvasStyleData } from './state'
import {
  DataSlotter,
  useActionState,
  useCanvasState,
  useClipBoardState,
  useDataState,
  useScriptState,
  useSnapshotState
} from './state'
import {
  clearCanvas,
  copy,
  decompose,
  exportCanvas,
  fullScreen,
  importCanvas,
  paste,
  recoveryDraft,
  setShowEm,
  undo
} from './toolbars'
import type {
  ComponentItem,
  ContextmenuItem,
  DOMRectStyle,
  Location,
  Position,
  RelativePosition,
  Vector
} from './type'
import {
  createComponent,
  filterStyle,
  getComponentStyle,
  getInnerComponentShapeStyle,
  handleLogger,
  toPercent
} from './utils'

export {
  Canvas,
  clearCanvas,
  CodeEditor,
  ComponentGroupList,
  Container,
  copy,
  createAttrComponent,
  createComponent,
  DataMode,
  DataSlotter,
  decompose,
  DemoDataPlugin,
  Designer,
  Directive,
  EditMode,
  Editor,
  exportCanvas,
  filterStyle,
  fullScreen,
  getComponentStyle,
  getInnerComponentShapeStyle,
  Group,
  GroupType,
  handleLogger,
  HOOKS,
  iconMap,
  importCanvas,
  LeftSideBar,
  paste,
  PixelEnum,
  Previewer,
  recoveryDraft,
  RightSideBar,
  setShowEm,
  Shape,
  ToolBar,
  ToolBarItem,
  ToolsBar,
  toPercent,
  undo,
  useActionState,
  useCanvasState,
  useClipBoardState,
  useComponentPlugin,
  useDataState,
  useEmpty,
  useScriptState,
  useSnapshotState,
  XIcon
}
export type {
  CanvasData,
  CanvasStyleData,
  ComponentItem,
  ComponentStyle,
  ContextmenuItem,
  DOMRectStyle,
  Location,
  Position,
  RelativePosition,
  StoreComponentData,
  ToolBarItemType,
  Vector
}

export default {
  Canvas,
  CodeEditor,
  ComponentGroupList,
  Container,
  createComponent,
  DataMode,
  DataSlotter,
  DemoDataPlugin,
  Designer,
  Directive,
  EditMode,
  Editor,
  exportCanvas,
  Group,
  GroupType,
  handleLogger,
  importCanvas,
  LeftSideBar,
  PixelEnum,
  Previewer,
  recoveryDraft,
  RightSideBar,
  setShowEm,
  Shape,
  ToolBar,
  ToolBarItem,
  ToolsBar,
  undo,
  useActionState,
  useCanvasState,
  useClipBoardState,
  useComponentPlugin,
  useDataState,
  useEmpty,
  useScriptState,
  useSnapshotState,
  XIcon,
  iconMap,
  createAttrComponent
}
