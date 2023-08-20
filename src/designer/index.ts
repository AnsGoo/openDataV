import { CodeEditor, Group, ToolBar, ToolBarItem, XIcon } from './components'
import DemoDataPlugin from './data/DemoData'
import Shape from './Editor/Shape'
import { ComponentGroup, DataMode, FormType } from './enum'
import useComponentPlugin from './loadPlugin'
import Designer from './pages/designer/Designer.vue'
import Previewer from './pages/perviewer/viewer.vue'
import Directive from './plugins/directive'
import type { ContextmenuItem } from './plugins/directive/contextmenu/types'
import {
  DataSlotter,
  useActionState,
  useCanvasState,
  useClipBoardState,
  useDataState,
  useScriptState,
  useSnapshotState
} from './state'
import type { CanvasStyleData } from './state/type'
import { exportCanvas, importCanvas, recoveryDraft, setShowEm, undo } from './toolbars'
import type { ComponentDataType, ComponentItem, MetaContainerItem } from './type'

export {
  CodeEditor,
  ComponentGroup,
  DataMode,
  DataSlotter,
  DemoDataPlugin,
  Designer,
  Directive,
  exportCanvas,
  FormType,
  Group,
  importCanvas,
  Previewer,
  recoveryDraft,
  setShowEm,
  Shape,
  ToolBar,
  ToolBarItem,
  undo,
  useActionState,
  useCanvasState,
  useClipBoardState,
  useComponentPlugin,
  useDataState,
  useScriptState,
  useSnapshotState,
  XIcon
}
export type {
  CanvasStyleData,
  ComponentDataType,
  ComponentItem,
  ContextmenuItem,
  MetaContainerItem
}
