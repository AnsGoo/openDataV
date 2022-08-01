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
import type { AppRouteRecordRaw, MenuType } from './types'
import NProgress from '@/utils/progress'
import { useUserStoreWithOut } from '@/store/modules/user'

const userStore = useUserStoreWithOut()
class RouteView {
  // 路由对象
  private router: Router | undefined = undefined

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
        return
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
    myRouter.afterEach((to) => {
      document.title = (to?.meta?.title as string) || import.meta.env.VITE_APP_TITLE
      NProgress.done()
    })
  }

  // 获取所有子路由
  private getChildRoutes(route: AppRouteRecordRaw): string[] {
    const childList: string[] = []
    if (!route.children?.length) {
      return childList
    }

    for (let item of route.children) {
      childList.push(item.path)
      childList.push(...this.getChildRoutes(item))
    }
    return childList
  }

  private getNormalRoutes(): AppRouteRecordRaw[] {
    if (!this.router) {
      return []
    }

    // 因为所有路由都是平铺结构，而且路由间的嵌套关系依然存在，因此我们要找到真正的顶层路由，根据嵌套关系显示在菜单中
    const routes = this.router?.getRoutes()
    const childRoutes: string[] = []
    for (const route of routes) {
      childRoutes.push(...this.getChildRoutes(route as unknown as AppRouteRecordRaw))
    }

    // 去重重复路径
    const noDuplicatePaths = new Set([...childRoutes])

    return routes.filter((route) => {
      if (noDuplicatePaths.has(route.path)) {
        return false
      }
      return true
    }) as unknown as AppRouteRecordRaw[]
  }

  private formatRouteToMenu(routes: Optional<AppRouteRecordRaw[]>): MenuType[] {
    if (!routes) {
      return []
    }

    const menuRoutes = routes.filter((route) => {
      if (route.meta.hideInMenu) {
        return false
      }
      return true
    })

    const menus: MenuType[] = []
    for (const item of menuRoutes) {
      const children = this.formatRouteToMenu(item.children)
      menus.push({
        name: item.name,
        title: item.meta.title,
        icon: item.meta.icon ? item.meta.icon : '',
        children: children.length ? children : undefined
      })
    }

    return menus
  }

  // 生成路由菜单
  public generatorMenu() {
    const routes = this.getNormalRoutes()
    return this.formatRouteToMenu(routes)
  }

  // 获取路由对象
  public getRouter(): Router {
    return this.router as Router
  }
}

const routeView = new RouteView()

export { routeView, MenuType }

export default routeView.getRouter()
