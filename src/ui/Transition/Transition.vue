<!-- https://segmentfault.com/q/1010000011359250-->
<template>
  <transition v-bind="collapseTransitionProps">
    <slot></slot>
  </transition>
</template>
<script lang="ts">
import type { TransitionProps } from 'vue'

const elTransition =
  '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out'
const collapseTransitionProps: TransitionProps = {
  onBeforeEnter(_el: Element) {
    const el = _el as HTMLElement
    el.style.transition = elTransition
    //if (!el.dataset) el.dataset = {}
    if (el.dataset) {
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
    }
    el.style.height = '0'
    el.style.paddingTop = '0'
    el.style.paddingBottom = '0'
  },

  onEnter(_el: Element) {
    const el = _el as HTMLElement
    el.dataset.oldOverflow = el.style.overflow
    el.style.transitionProperty = 'all'
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop || ''
      el.style.paddingBottom = el.dataset.oldPaddingBottom || ''
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop || ''
      el.style.paddingBottom = el.dataset.oldPaddingBottom || ''
    }
    el.style.overflow = 'hidden'
  },

  onAfterEnter(_el: Element) {
    const el = _el as HTMLElement
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow || ''
  },

  onBeforeLeave(_el: Element) {
    const el = _el as HTMLElement
    // if (!el.dataset) el.dataset = {}
    if (el.dataset) {
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow
    }

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },

  onLeave(_el: Element) {
    const el = _el as HTMLElement
    el.style.transitionProperty = 'all'
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      el.style.transition = elTransition
      el.style.height = '0'
      el.style.paddingTop = '0'
      el.style.paddingBottom = '0'
    }
  },

  onAfterLeave(_el: Element) {
    const el = _el as HTMLElement
    el.style.transition
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow || ''
    el.style.paddingTop = el.dataset.oldPaddingTop || ''
    el.style.paddingBottom = el.dataset.oldPaddingBottom || ''
  }
}

export default {
  functional: true,
  setup() {
    return {
      collapseTransitionProps
    }
  }
}
</script>
