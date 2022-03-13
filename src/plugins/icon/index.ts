// https://iconpark.bytedance.com/official

import { App } from 'vue'
import {
  DeleteOne,
  PreviewCloseOne,
  PreviewOpen,
  Back,
  Next,
  Clear,
  DownloadOne,
  UploadOne,
  SaveOne,
  Cones,
  FullScreen,
  Loading,
  Setting,
  Home,
  Logout,
  PageTemplate,
  Picture,
  ExpandLeft,
  ExpandRight,
  Components,
  Layers,
  Page,
  TextStyle,
  InternalData,
  GamePs,
  Computer,
  FileDoc,
  Translate,
  Moon,
  Sun
} from '@icon-park/vue-next'

export default {
  install(app: App) {
    // 插入元素
    app.component(DeleteOne.name, DeleteOne)
    app.component(PreviewCloseOne.name, PreviewCloseOne)
    app.component(PreviewOpen.name, PreviewOpen)
    app.component(Back.name, Back)
    app.component(Clear.name, Clear)
    app.component(DownloadOne.name, DownloadOne)
    app.component(SaveOne.name, SaveOne)
    app.component(UploadOne.name, UploadOne)
    app.component(Cones.name, Cones)
    app.component(FullScreen.name, FullScreen)
    app.component(Loading.name, Loading)
    app.component(Setting.name, Setting)
    app.component(Home.name, Home)
    app.component(Logout.name, Logout)
    app.component(PageTemplate.name, PageTemplate)
    app.component(Picture.name, Picture)
    app.component(ExpandLeft.name, ExpandLeft)
    app.component(Components.name, Components)
    app.component(Layers.name, Layers)
    app.component(Page.name, Page)
    app.component(TextStyle.name, TextStyle)
    app.component(GamePs.name, GamePs)
    app.component(ExpandRight.name, ExpandRight)
    app.component(InternalData.name, InternalData)
    app.component(Computer.name, Computer)
    app.component(FileDoc.name, FileDoc)
    app.component(Translate.name, Translate)
    app.component(Moon.name, Moon)
    app.component(Sun.name, Sun)
    app.component(Next.name, Next)
  }
}
