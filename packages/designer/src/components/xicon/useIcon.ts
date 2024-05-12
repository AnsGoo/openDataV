import { Icon } from '@vicons/utils'
import type { Component, ComputedRef, PropType } from 'vue'
import { computed, defineComponent, h, inject } from 'vue'

import stanadarIcon from './icon-map'

export default function useIcon(icons?: Record<string, Component>) {
  stanadarIcon as Record<string, Component>
  const iconMap = { ...stanadarIcon, ...(icons || {}) }
  return defineComponent({
    props: {
      name: {
        type: String as PropType<string>,
        default: 'help'
      },
      color: {
        type: String as PropType<string>
      },
      size: {
        type: Number as PropType<number>,
        default: 25
      }
    },
    setup(props, _context) {
      const darkTheme = inject<ComputedRef<boolean>>(
        'DarkTheme',
        computed(() => true)
      )
      const getIconColor = () => {
        return darkTheme.value ? '#eeee' : '#333'
      }
      const iconColor = computed<string>(() => (props.color ? props.color : getIconColor()))
      return { iconColor }
    },
    render: ({ name, size, iconColor }: { name: string; size: number; iconColor: string }) => {
      const obIcon = iconMap[name]
      return h(
        Icon,
        {
          class: 'h-full inline-flex justify-center items-center',
          tag: 'span',
          size: size,
          color: iconColor
        },
        () => h(obIcon, {})
      )
    }
  })
}
