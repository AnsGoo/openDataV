import { NCard, NCollapse, NCollapseItem, NTabPane, NTabs } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, reactive } from 'vue'

import { ContainerType } from '@/enum'
import type { MetaContainerItem, MetaForm } from '@/types/component'

import FormAttr from './FormAttr'

export default defineComponent({
  components: {
    FormAttr
  },
  props: {
    config: {
      type: Object as PropType<Array<MetaContainerItem>>,
      required: true
    },
    data: {
      type: Object as PropType<Recordable>,
      required: true
    },
    mode: {
      type: String as PropType<ContainerType>,
      required: false,
      default: ContainerType.COLLAPSE
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const formData = reactive<Recordable>(props.data)
    const change = (keys: Array<string>, val: any) => {
      emit('change', keys, val)
    }
    const renderContainer = (containerItems: Array<MetaContainerItem>) => {
      switch (props.mode) {
        case ContainerType.COLLAPSE:
          return (
            <NCollapse accordion={true}>
              {containerItems.map((el) => {
                return (
                  <NCollapseItem key={el.prop} title={el.label} name={el.prop}>
                    <FormAttr
                      children={(el.children || []) as Array<MetaForm>}
                      data={formData[el.prop]}
                      name={el.label}
                      uid={el.prop}
                      ukey={el.prop}
                      onChange={change}
                    />
                  </NCollapseItem>
                )
              })}
            </NCollapse>
          )
        case ContainerType.TABS:
          return (
            <NTabs type="line">
              {containerItems.map((el) => {
                return (
                  <NTabPane key={el.prop} tab={el.label} name={el.prop}>
                    <FormAttr
                      children={(el.children || []) as Array<MetaForm>}
                      data={formData[el.prop]}
                      name={el.label}
                      uid={el.prop}
                      ukey={el.prop}
                      onChange={change}
                    />
                  </NTabPane>
                )
              })}
            </NTabs>
          )
        case ContainerType.CARD:
          return (
            <>
              {containerItems.map((el) => {
                return (
                  <NCard title={el.label}>
                    <FormAttr
                      children={(el.children || []) as Array<MetaForm>}
                      key={el.prop}
                      data={formData[el.prop]}
                      name={el.label}
                      uid={el.prop}
                      ukey={el.prop}
                      onChange={change}
                    />
                  </NCard>
                )
              })}
            </>
          )
        case ContainerType.FORM:
          return (
            <>
              {containerItems.map((el) => {
                return (
                  <FormAttr
                    children={(el.children || []) as Array<MetaForm>}
                    key={el.prop}
                    data={formData[el.prop]}
                    name={el.label}
                    uid={el.prop}
                    ukey={el.prop}
                    onChange={change}
                  />
                )
              })}
            </>
          )
      }
    }
    return () => renderContainer(props.config)
  }
})
