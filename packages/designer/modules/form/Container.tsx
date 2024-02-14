import type { MetaContainerItem, MetaForm } from 'open-data-v/base'
import { ContainerType } from 'open-data-v/base'
import { OCard, OCollapse, OCollapseItem, ODivider } from 'open-data-v/ui'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'

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
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    mode: {
      type: String as PropType<ContainerType>,
      required: false,
      defalut: ContainerType.CARD
    },
    flat: {
      type: Boolean as PropType<boolean>,
      required: false,
      defalut: false
    }
  },
  emits: ['change', 'update:data'],
  setup(props, { emit }) {
    const formData = ref<Record<string, any>>(props.data)
    const change = (keys: Array<string>, val: any) => {
      emit('change', keys, val)
      emit('update:data', formData)
    }

    watch(
      () => props.data,
      () => {
        formData.value = props.data
      }
    )

    const updateForm = (prop: string, data: any) => {
      formData.value[prop] = data
    }

    const renderForm = (el: MetaContainerItem) => {
      const modeValue = props.flat ? formData.value : formData.value[el.prop]
      const children = (el.children || []) as Array<MetaForm>
      return modeValue ? (
        <FormAttr
          children={children}
          data={modeValue}
          name={el.label}
          uid={el.prop}
          ukey={el.prop}
          onChange={change}
          onUpdateData={updateForm}
        />
      ) : (
        <> {'未获取到正确的数据'}</>
      )
    }
    const renderContainer = (containerItems: Array<MetaContainerItem>) => {
      switch (props.mode) {
        case ContainerType.COLLAPSE:
          return (
            <OCollapse accordion={true}>
              {containerItems.map((el) => {
                return (
                  <OCollapseItem key={el.prop} title={el.label} name={el.prop}>
                    {renderForm(el)}
                  </OCollapseItem>
                )
              })}
            </OCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              {containerItems.map((el) => {
                return (
                  <OCard title={el.label} class="mb-1">
                    {renderForm(el)}
                  </OCard>
                )
              })}
            </>
          )
        case ContainerType.FORM:
          return (
            <div class="p-2">
              {containerItems.map((el) => {
                return (
                  <>
                    <ODivider
                      title-placement="left"
                      style={{ marginTop: '0px', marginBottom: '0px' }}
                    >
                      {el.label}
                    </ODivider>
                    {renderForm(el)}
                  </>
                )
              })}
            </div>
          )
      }
    }
    return () => renderContainer(props.config)
  }
})
