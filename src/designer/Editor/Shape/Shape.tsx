import { defineComponent, ref, computed, onMounted, onErrorCaptured, watch } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useComposeStoreWithOut } from '@/store/modules/compose'
import type { ComponentPublicInstance, PropType } from 'vue'
import { mod360, copyText, throttleFrame } from '@/utils/utils'
import { eventBus, StaticKey } from '@/bus'
import type { Vector } from '@/types/common'
import type { ContextmenuItem } from '@/plugins/directive/contextmenu/types'
import { useCopyStoreWithOut } from '@/store/modules/copy'
import type { ComponentStyle } from '@/types/component'
import { stretchedComponents } from '@/utils/component'
import type { BaseComponent } from '@/resource/models'
import styles from './shape.module.less'
import { XIcon } from '@/plugins/xicon'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    isInner: {
      type: Boolean,
      default: false
    },
    info: Object as PropType<BaseComponent>,
    defaultStyle: Object as PropType<ComponentStyle>,
    index: Number
  },
  setup(props, { slots }) {
    const basicStore = useBasicStoreWithOut()
    const composeStore = useComposeStoreWithOut()
    const copyStore = useCopyStoreWithOut()

    const copy = () => {
      copyStore.copy(basicStore.curComponent!)
    }

    const deleteComponent = () => {
      basicStore.removeComponent(props.index!, props.info!.parent)
    }

    const upComponent = () => {
      basicStore.upComponent(props.index!, props.info!.parent)
    }

    const downComponent = () => {
      basicStore.downComponent(props.index!, props.info!.parent)
    }

    const topComponent = () => {
      basicStore.topComponent(props.index!, props.info!.parent)
    }

    /**
     * 复制组件ID
     */
    const copyComponentId = () => {
      const id = basicStore.curComponent!.id
      copyText(id as string)
    }

    const bottomComponent = () => {
      basicStore.bottomComponent(props.index!, props.info!.parent)
    }

    const decompose = () => {
      basicStore.decompose()
    }

    const contextmenus = (_: HTMLDivElement, event: MouseEvent): Optional<ContextmenuItem[]> => {
      // 如果当前有选中组件，并且接受到contextmenu事件的组件正是当前组件，就停止事件冒泡
      if (basicStore.curComponent && basicStore.curComponent.id === props.info!.id) {
        event.stopPropagation()
      } else if (!basicStore.curComponent && !props.info!.parent) {
        // 如果当前没有选中组件，就选中最底层的组件
        basicStore.setCurComponent(props.info!, props.index!.toString())
        event.stopPropagation()
      } else {
        return
      }

      return [
        {
          text: '拆分',
          subText: '',
          disable: basicStore.curComponent?.component !== 'Group',
          handler: decompose
        },
        { divider: true },
        {
          text: '复制',
          subText: 'Ctrl + C',
          handler: copy
        },
        {
          text: '复制ID',
          subText: '',
          handler: copyComponentId
        },
        {
          text: '删除',
          subText: 'Ctr + Delete',
          handler: deleteComponent
        },
        { divider: true },
        {
          text: '置于顶层',
          handler: topComponent,
          children: [
            { text: '置于顶层', handler: topComponent },
            { text: '上移一层', handler: upComponent }
          ]
        },
        {
          text: '置于底层',
          handler: bottomComponent,
          children: [
            { text: '置于底层', handler: bottomComponent },
            { text: '下移一层', handler: downComponent }
          ]
        }
      ]
    }

    const showEm = computed(() => basicStore.isShowEm)

    const shape = ref<ElRef>(null)

    const cursors = ref({})

    const borderWidth = ref<string>('0px')
    const borderColor = ref<string>('#fff0')
    const borderStyle = ref<string>('none')
    const isError = ref<boolean>(false)
    const errorInfo = ref<string>('')

    onErrorCaptured((err: Error, instance: ComponentPublicInstance | null, info: string) => {
      console.log(err)
      if (info === 'render function') {
        if (basicStore.isEditMode) {
          if (instance) {
            const { name }: { name: string } = instance['component'] || {}
            errorInfo.value = `组件[${name}]渲染异常`
          } else {
            errorInfo.value = `组件渲染异常`
          }
          borderWidth.value = '5px'
          borderColor.value = 'red'
          borderStyle.value = 'dashed'
          isError.value = true
        }
        return false
      } else {
        return true
      }
    })

    const isActive = computed<boolean>(() => {
      return (props.active && !props.info!.locked) || composeStore.isActived(props.info!)
    })

    const appendComponent = () => {
      composeStore.appendComponent(basicStore.curComponent)
      composeStore.appendComponent(props.info!)
    }

    /**
     * 拖动组件
     */
    const handleDragendShape = (e: MouseEvent) => {
      e.preventDefault()
      // 如果当前组件的父组件为undefined，则阻止冒泡像画布传递
      if (!props.info!.parent) {
        e.stopPropagation()
      }

      // 如果没选择组件，或者选中的组件不是自己，就把事件向外冒泡
      if (!basicStore.curComponent || props.info!.id !== basicStore.curComponent.id) return

      // 如果组件锁定了，就把事件向外冒泡
      if (props.info!.locked) return

      e.stopPropagation()
      cursors.value = getCursor()

      let { top, left } = props.defaultStyle!
      const startY = e.clientY
      const startX = e.clientX
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = top
      const startLeft = left

      // 如果元素没有移动，则不保存快照
      const move = throttleFrame((moveEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        top = (curY - startY) / basicStore.scale + startTop
        left = (curX - startX) / basicStore.scale + startLeft

        // // 修改当前组件样式
        basicStore.syncComponentLocation({ top, left }, props.info!.parent, false)
      })
      const up = () => {
        // 触发元素停止移动事件，用于隐藏标线
        eventBus.emit(StaticKey.DRAG_STOP)
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        if (props.info && props.info.parent) {
          basicStore.resizeAutoComponent(props.info.parent)
        }
        basicStore.saveComponentData()
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }

    const selectCurComponent = (e: MouseEvent) => {
      // 如果键盘 ctrl 或 command(mac) 键按下，则添加选中组件
      if (e.ctrlKey || e.metaKey) {
        appendComponent()
        return
      }

      e.preventDefault()
      if (!props.isInner) {
        e.stopPropagation()
        basicStore.setCurComponent(props.info, props.index!.toString())
      } else {
        if (props.info!.parent?.id === basicStore.benchmarkComponent?.id) {
          e.stopPropagation()
          basicStore.setCurComponent(props.info, props.index!.toString())
        }
      }
    }

    const dbselectCurComponent = (e: MouseEvent) => {
      if (!props.isInner) {
        return
      }

      e.preventDefault()
      if (props.info && (!props.info.parent || props.info.parent?.active)) {
        // 阻止向父组件冒泡
        e.stopPropagation()
        basicStore.setCurComponent(props.info, props.index!.toString())
      }
    }

    /**
     * 拉伸组件
     */
    const handleStretchedShape = (point: string, e: MouseEvent) => {
      if (e.button !== 0) {
        return
      }

      if (!(basicStore.curComponent && props.info!.id === basicStore.curComponent.id)) return
      e.stopPropagation()
      e.preventDefault()

      const position = {
        top: props.defaultStyle!.top,
        left: props.defaultStyle!.left,
        height: props.defaultStyle!.height,
        width: props.defaultStyle!.width,
        rotate: props.defaultStyle!.rotate
      }
      // 获取画布位移信息
      const editorRectInfo = document.querySelector('#editor')!.getBoundingClientRect()

      // 获取 point 与实际拖动基准点的差值 @justJokee
      // fix https://github.com/woai3c/visual-drag-demo/issues/26#issue-937686285

      const move = throttleFrame((moveEvent: MouseEvent) => {
        // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
        // 因此第一次点击时不触发 move 事件
        const curPositon: Vector = {
          x: (moveEvent.clientX - editorRectInfo.left) / basicStore.scale,
          y: (moveEvent.clientY - editorRectInfo.top) / basicStore.scale
        }
        const { top, left, width, height } = stretchedComponents(point, position, curPositon)
        basicStore.syncComponentLocation({ top, left, width, height }, props.info!.parent, false)
      })

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        if (props.info) {
          basicStore.resizeAutoComponent(props.info.parent)
        }
        basicStore.saveComponentData()
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }

    /**
     * 旋转组件
     */
    const handleRotate = (e: MouseEvent) => {
      if (e.button !== 0) {
        return
      }

      if (!shape.value) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      if (!(basicStore.curComponent && props.info!.id === basicStore.curComponent.id)) return
      if (props.info!.locked) return

      // 初始坐标和初始角度
      let { rotate } = { ...props.defaultStyle! }
      const startY: number = e.clientY
      const startX: number = e.clientX
      const startRotate: number = rotate

      // 获取元素中心点位置
      const rect: DOMRect = shape.value.getBoundingClientRect()
      const centerX: number = rect.left + rect.width / 2
      const centerY: number = rect.top + rect.height / 2

      // 旋转前的角度
      const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

      // 如果元素没有移动，则不保存快照
      // let hasMove = false
      const move = throttleFrame((moveEvent: MouseEvent) => {
        // hasMove = true
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        // 旋转后的角度
        const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
        // 获取旋转的角度值
        rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
        // 修改当前组件样式
        basicStore.syncComponentLocation({ rotate }, props.info!.parent, false)
      })

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        if (props.info) {
          basicStore.resizeAutoComponent(props.info.parent)
        }
        basicStore.saveComponentData()
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }

    const getCursor = () => {
      if (!basicStore.curComponent) {
        return {}
      }

      const rotate: number = mod360(basicStore.curComponent!.style.rotate) // 取余 360
      const result = {}
      let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
      const angleToCursor = [
        // 每个范围的角度对应的光标
        { start: 338, end: 23, cursor: 'nw' },
        { start: 23, end: 68, cursor: 'n' },
        { start: 68, end: 113, cursor: 'ne' },
        { start: 113, end: 158, cursor: 'e' },
        { start: 158, end: 203, cursor: 'se' },
        { start: 203, end: 248, cursor: 's' },
        { start: 248, end: 293, cursor: 'sw' },
        { start: 293, end: 338, cursor: 'w' }
      ]
      const initialAngle: Recordable<number> = {
        // 每个点对应的初始角度
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315
      }

      const points = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']
      points.forEach((point: string) => {
        const angle: number = mod360(initialAngle[point] + rotate)
        const len: number = angleToCursor.length
        while (true) {
          lastMatchIndex = (lastMatchIndex + 1) % len
          const angleLimit = angleToCursor[lastMatchIndex]
          if (angle < 23 || angle >= 338) {
            result[point] = 'nw-resize'
            return
          }

          if (angleLimit.start <= angle && angle < angleLimit.end) {
            result[point] = angleLimit.cursor + '-resize'
            return
          }
        }
      })
      return result
    }

    const rotateClassName = computed(() => {
      const prefix = 'rotate-'
      const rotate = props.defaultStyle!.rotate
      if (rotate > -22.5 && rotate <= 22.5) return prefix + 0
      else if (rotate > 22.5 && rotate <= 67.5) return prefix + 45
      else if (rotate > 67.5 && rotate <= 112.5) return prefix + 90
      else if (rotate > 112.5 && rotate <= 157.5) return prefix + 135
      else if (rotate > 157.5 || rotate <= -157.5) return prefix + 0
      else if (rotate > -157.5 && rotate <= -112.5) return prefix + 45
      else if (rotate > -112.5 && rotate <= -67.5) return prefix + 90
      else if (rotate > -67.5 && rotate <= -22.5) return prefix + 135
      return prefix + 0
    })

    /**
     * 方向键控制组件移动
     */
    const keyDown = (e: KeyboardEvent): void => {
      document.addEventListener('keyup', keyUp)
      if (!(basicStore.curComponent && props.info!.id === basicStore.curComponent.id)) return

      const aliasCtrlKey = e.ctrlKey || e.metaKey

      e.stopPropagation()
      if (props.info && aliasCtrlKey) {
        /**
         * 使用 code 可以避免大小写的问题。比如 s 的 code 为 KeyS，如果是 Key，那么就可能是 s 或 S。
         * @see https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#code_values
         */
        switch (e.code) {
          case 'ArrowLeft':
            e.preventDefault()
            basicStore.syncComponentLocation(
              { left: props.info.positionStyle.left - 1 },
              props.info.parent,
              false
            )
            break
          case 'ArrowUp':
            e.preventDefault()
            basicStore.syncComponentLocation(
              { top: props.info.positionStyle.top - 1 },
              props.info.parent,
              false
            )
            break
          case 'ArrowRight':
            e.preventDefault()
            basicStore.syncComponentLocation(
              { left: props.info.positionStyle.left + 1 },
              props.info.parent,
              false
            )
            break
          case 'ArrowDown':
            e.preventDefault()
            basicStore.syncComponentLocation(
              { top: props.info.positionStyle.top + 1 },
              props.info.parent,
              false
            )
            break
          case 'Delete':
            e.preventDefault()
            deleteComponent()
            break
          default:
            return
        }
      }
    }

    const keyUp = (e: KeyboardEvent): void => {
      if (!(basicStore.curComponent && props.info!.id === basicStore.curComponent.id)) return

      e.stopPropagation()
      if (props.info) {
        basicStore.resizeAutoComponent(props.info.parent)
      }
      basicStore.saveComponentData()
      document.removeEventListener('keyup', keyUp)
    }

    onMounted(() => {
      cursors.value = getCursor()
    })

    watch(
      () => basicStore.curComponent,
      (newValue: BaseComponent | undefined) => {
        if (newValue && props.info!.id === newValue.id) {
          document.addEventListener('keydown', keyDown)
        } else {
          document.removeEventListener('keydown', keyDown)
        }
      }
    )

    interface PointRenderType {
      top: string
      left: string
      direction: string
    }

    const pointRenderData: PointRenderType[] = [
      {
        top: '0%',
        left: '0%',
        direction: 'lt'
      },
      {
        top: '0%',
        left: '50%',
        direction: 't'
      },
      {
        top: '0%',
        left: '100%',
        direction: 'rt'
      },
      {
        top: '50%',
        left: '100%',
        direction: 'r'
      },
      {
        top: '100%',
        left: '100%',
        direction: 'rb'
      },
      {
        top: '100%',
        left: '50%',
        direction: 'b'
      },
      {
        top: '100%',
        left: '0%',
        direction: 'lb'
      },
      {
        top: '50%',
        left: '0%',
        direction: 'l'
      }
    ]

    const contentRender = () => {
      return (
        <>
          <span class={styles.errorInfo} v-show={isError.value}>
            {errorInfo.value}
          </span>
          <XIcon
            class={styles.rotation}
            name="rotation"
            v-show={isActive.value}
            onMousedown={handleRotate}
          />
          <em v-show={showEm.value}>
            ({props.defaultStyle!.left},{props.defaultStyle!.top})
          </em>
          {pointRenderData.map((point) => (
            <div
              class={[styles.shapePoint, styles[point.direction], styles[rotateClassName.value]]}
              v-show={isActive.value}
              style={{ top: point.top, left: point.left }}
              onMousedown={(event) => handleStretchedShape(point.direction, event)}
            ></div>
          ))}
          {slots.default && slots.default()}
        </>
      )
    }
    return () => (
      <div
        ref={shape}
        class={[styles.shape, isActive.value || props.active ? styles.active : '']}
        onDblclick={(event) => dbselectCurComponent(event)}
        onClick={(event) => selectCurComponent(event)}
        onMousedown={(event) => handleDragendShape(event)}
        v-contextmenu={(_, event) => contextmenus(_, event)}
      >
        {contentRender()}
      </div>
    )
  }
})
