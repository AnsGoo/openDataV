import { createPinia } from 'pinia'
import { StoragePlugin } from './plugins'
const store = createPinia()
store.use(StoragePlugin({ logger: import.meta.env.DEV, activeStores: ['app-project-setting'] }))
export default store
