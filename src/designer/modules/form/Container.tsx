import { NCard, NCollapse, NCollapseItem, NTabPane, NTabs } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, reactive } from 'vue'

import { ContainerType } from '@/enum'
import type { CollapseProps, MetaContainerItem, MetaForm, TabsProps } from '@/types/component'

import FormAttr from './FormAttr'

export default defineComponent({
  components: {
    FormAttr
  },
  props: {
    config: {
      type: Object as PropType<MetaContainerItem>,
      required: true
    },
    data: {
      type: Object as PropType<Recordable>,
      required: true
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const formData = reactive<Recordable>(props.data)
    const change = (keys: Array<string>, val: any) => {
      emit('change', keys, val)
    }
    const renderContainer = (item: MetaContainerItem) => {
      const containerProps = item.props!
      switch (item.type) {
        case ContainerType.COLLAPSE:
          return (
            <NCollapse accordion={(containerProps as CollapseProps).accordion}>
              {item.children.map((el) => {
                return (
                  <NCollapseItem key={`${item.prop}${el.prop}`} title={el.label} name={el.prop}>
                    <FormAttr
                      children={(el.children || []) as Array<MetaForm>}
                      data={formData[el.prop]}
                      name={el.label}
                      uid={el.prop}
                      ukey={`${item.prop}${el.prop}`}
                      onChange={change}
                    />
                  </NCollapseItem>
                )
              })}
            </NCollapse>
          )
        case ContainerType.TABS:
          return (
            <NTabs
              type={(containerProps as TabsProps).type}
              justifyContent={(containerProps as TabsProps).justifyContent}
            >
              {item.children.map((el) => {
                return (
                  <NTabPane key={`${item.prop}${el.prop}`} tab={el.label} name={el.prop}>
                    <FormAttr
                      children={(el.children || []) as Array<MetaForm>}
                      data={formData[el.prop]}
                      name={el.label}
                      uid={el.prop}
                      ukey={`${item.prop}${el.prop}`}
                      onChange={change}
                    />
                  </NTabPane>
                )
              })}
            </NTabs>
          )
        case ContainerType.CARD:
          return (
            <NCard title={item.label}>
              {item.children.map((el) => {
                return (
                  <FormAttr
                    children={(el.children || []) as Array<MetaForm>}
                    key={`${item.prop}${el.prop}`}
                    data={formData[el.prop]}
                    name={el.label}
                    uid={el.prop}
                    ukey={`${item.prop}${el.prop}`}
                    onChange={change}
                  />
                )
              })}
            </NCard>
          )
        case ContainerType.FORM:
          return (
            <>
              {item.children.map((el) => {
                return (
                  <FormAttr
                    children={(el.children || []) as Array<MetaForm>}
                    key={`${item.prop}${el.prop}`}
                    data={formData[el.prop]}
                    name={el.label}
                    uid={el.prop}
                    ukey={`${item.prop}${el.prop}`}
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
