/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace layer {}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_PORT: string
  readonly VITE_ROUER_MODE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_AUTH_TOKEN: string
  readonly VITE_TOKEN_STORAGE: string
  readonly VITE_APP_PROXY: string
  readonly VITE_APP_NO_AUTH: string
  readonly VITE_ALERT_DELAY: string
  readonly VITE_MOCK: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
