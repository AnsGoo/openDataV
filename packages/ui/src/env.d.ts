/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

declare type Nullable<T> = T | null
declare type Optional<T> = T | undefined

// 元素类型定义
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
declare type Recordable<T = any> = Record<string, T>
