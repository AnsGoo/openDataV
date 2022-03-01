import type { App } from 'vue'
import {
  Router,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouterHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'
import { LOGIN_URL, NoAuth, RouteMode } from '@/enum'
import { AppRouteRecordRaw } from '@/router/interface'
import NProgress from '@/utils/progress'
import { useUserStoreWithOut } from '@/store/modules/user'

const userStore = useUserStoreWithOut()
class RouteView {
  // 路由对象
  private router: Router | unknown = undefined

  constructor() {
    this.router = this.createRouter()
    this.beforeRouteChange()
    this.afterRouteChange()
  }

  // 根据环境变量中的配置生成路由模式
  private createHistory = (): RouterHistory => {
    if (import.meta.env.VITE_ROUER_MODE === RouteMode.HISTORY) {
      return createWebHistory()
    } else {
      return createWebHashHistory()
    }
  }

  // 动态获取 modules 目录下的所有 .ts 文件生成基础路由
  private createBasicRoutes = (): AppRouteRecordRaw[] => {
    const moduleFiles: Recordable<{ [key: string]: any }> = import.meta.globEager(
      './modules/**/*.ts'
    )
    const routeModuleList: AppRouteRecordRaw[] = []
    Object.keys(moduleFiles).forEach((key) => {
      const mod: { [key: string]: any } = moduleFiles[key].default || {}
      const modList: AppRouteRecordRaw[] = Array.isArray(mod) ? [...mod] : [mod]
      routeModuleList.push(...modList)
    })

    return routeModuleList
  }

  // 创建路由对象
  private createRouter(): Router {
    return createRouter({
      history: this.createHistory(),
      routes: this.createBasicRoutes(),
      strict: true,
      scrollBehavior: () => ({ left: 0, top: 0 })
    })
  }

  // 路由守卫
  private beforeRouteChange(): void {
    if (!this.router) {
      return
    }
    const curRouter = this.router as Router
    curRouter.beforeEach((to, _, next) => {
      NProgress.start()

      // 如果网站不需要登录认证，所有路由直接切换
      if (to.meta.ignoreAuth) {
        next()
      }
      if (import.meta.env.VITE_APP_NO_AUTH === NoAuth.NO_AUTH) {
        next()
      } else {
        if (this.checkLogin(to)) {
          if (this.checkPermission(to)) {
            next()
          } else {
            this.to403(next)
          }
        } else {
          this.toLogin(to, next)
        }
      }
    })
  }

  /**
   * 检查是否认证
   * @param to 需要跳转的路由
   * @returns 检查结果
   */
  private checkLogin(to: RouteLocationNormalized): boolean {
    if (to.meta.ignoreAuth) {
      return true
    } else {
      return userStore.userToken ? true : false
    }
  }

  /**
   * 检查用户是否有访问权限
   * @param to 需要跳转的路由
   * @returns 检查结果
   */
  private checkPermission(to: RouteLocationNormalized): boolean {
    const permissions: string[] = userStore.userPermissions
    const permission: string | undefined = to.meta.permission as string | undefined

    if (permission && permissions.findIndex((el: string) => el === permission) > -1) {
      return true
    }

    return false
  }

  private toLogin(to: RouteLocationNormalized, next: NavigationGuardNext): void {
    next({
      path: LOGIN_URL,
      query: {
        redirect: to.fullPath
      }
    })
  }

  private to403(next: NavigationGuardNext): void {
    next({
      name: '403'
    })
  }

  private afterRouteChange(): void {
    if (!this.router) {
      return
    }

    const myRouter = this.router as Router
    myRouter.afterEach(() => {
      NProgress.done()
    })
  }

  // 获取路由对象
  public getRouter(): Router {
    return this.router as Router
  }
}

const router = new RouteView()

export const setupRouter = (app: App<Element>) => {
  app.use(router.getRouter())
}
