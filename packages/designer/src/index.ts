import type { ToolBarItemType } from './components'
import { CodeEditor, Group, iconMap, Toggle, ToolBar, ToolBarItem, XIcon } from './components'
import { HOOKS } from './const'
import DemoDataPlugin from './data/demo-data'
import type { StoreComponentData } from './db'
import Editor from './editor'
import Shape from './editor/shape'
import { DataMode, EditMode, PixelEnum } from './enum'
import useComponentPlugin from './load-plugin'
import { Container, useEmpty } from './modules'
import Canvas from './pages/designer/canvas.vue'
import Designer from './pages/designer/designer.vue'
import Previewer from './pages/perviewer/viewer.vue'
import DrapComponent from './panel/components/drap-component.vue'
import createAttrComponent from './panel/factory.tsx'
import RightSideBar from './panel/right-side-bar'
import ToolsBar from './panel/tools-bar'
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
import type { ContextmenuItem, RelativePosition } from './type'
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
  DrapComponent,
  EditMode,
  Editor,
  exportCanvas,
  filterStyle,
  fullScreen,
  getComponentStyle,
  getInnerComponentShapeStyle,
  Group,
  handleLogger,
  HOOKS,
  iconMap,
  importCanvas,
  paste,
  PixelEnum,
  Previewer,
  recoveryDraft,
  RightSideBar,
  setShowEm,
  Shape,
  Toggle,
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
  ContextmenuItem,
  RelativePosition,
  StoreComponentData,
  ToolBarItemType
}

export default {
  Canvas,
  CodeEditor,
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
  handleLogger,
  importCanvas,
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
