// 设置全局类型，主要为了解决类型声明时的异常报错
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

declare type Nullable<T> = T | null
declare type Optional<T> = T | undefined

// 元素类型定义
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
declare type Recordable<T = any> = Record<string, T>
