import type { Slotter } from '@open-data-v/base'
import { ContainerType } from '@open-data-v/base'
import {
  OButton,
  OCard,
  OCollapse,
  OCollapseItem,
  ODivider,
  OForm,
  OFormItem,
  OSelect
} from '@open-data-v/ui'
import type { PropType } from 'vue'
import { defineComponent, inject, onMounted, ref } from 'vue'

import { PANEL_MODEL } from '../../const'
import { useEmpty } from '../../modules'
import { useGraphState } from '../../state'

export default defineComponent({
  props: {
    slotter: {
      type: Object as PropType<Slotter>,
      required: true
    }
  },
  emits: {
    change: (payload: Array<any>) => {
      return payload
    }
  },
  setup(props) {
    const graphState = useGraphState()
    const dataState = graphState.dataPluginState
    const curDataType = ref<string>('')
    const globalDataTypes = ref<Array<{ label: string; value: string }>>([])
    const mode = inject<ContainerType>(PANEL_MODEL, ContainerType.FORM)

    onMounted(() => {
      const keys = Object.keys(dataState.componentPlugins)
      keys.forEach((el) => {
        const plugin = dataState.componentPlugins[el]
        globalDataTypes.value.push({
          label: plugin.title,
          value: plugin.name
        })
      })
    })
    const renderDataComponent = (dataType: string, id: string) => {
      const plugin = dataState.getPlugin(dataType)
      const DataComponent = plugin ? plugin.component : useEmpty('未发现相应的数据插件')
      const dataInstance = props.slotter.getHandler(id)
      return <DataComponent dataInstance={dataInstance} />
    }

    const appendGlobalData = () => {
      if (curDataType.value) {
        const plugin = dataState.getPlugin(curDataType.value)
        if (!plugin) return console.warn('未发现相应的数据插件')
        const dataInstance = new plugin.handler({})
        props.slotter.addHandler(dataInstance)
      }
    }
    const contextmenus = (event: MouseEvent, id: string) => {
      event.stopPropagation()
      return [
        {
          text: '删除',
          handler: () => {
            props.slotter.removeHandler(id)
          }
        }
      ]
    }
    const renderContainer = (dataType: string, id: string, index: number) => {
      console.log(dataType, id, index)
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <OCollapse accordion={true} v-contextmenu={(_, event) => contextmenus(event, id)}>
              <OCollapseItem
                title={`全局数据${index + 1}`}
                name="dataType"
                class="rounded m-1 border dark:border-zinc-500 border-zinc-200"
              >
                {renderDataComponent(dataType, id)}
              </OCollapseItem>
            </OCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              <OCard
                title={`全局数据${index + 1}`}
                class="my-1"
                v-contextmenu={(_, event) => contextmenus(event, id)}
              >
                {renderDataComponent(dataType, id)}
              </OCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div
              v-contextmenu={(_, event) => contextmenus(event, id)}
              class="rounded my-1 p-4 border dark:border-zinc-500 border-zinc-200"
            >
              <ODivider title-placement="left" class="my-2">
                {`全局数据${index + 1}`}
              </ODivider>
              {renderDataComponent(dataType, id)}
            </div>
          )
      }
    }

    const renderDataSelect = () => {
      return (
        <OForm labelPlacement="top">
          <OFormItem prop="dataType" label="数据类型">
            <div class="justify-center flex-row flex-nowrap flex items-center">
              <OSelect
                v-model:value={curDataType.value}
                placeholder="请选择数据类型"
                options={globalDataTypes.value}
                clearable={true}
              />
              <OButton type="success" onClick={appendGlobalData}>
                新增
              </OButton>
            </div>
          </OFormItem>
        </OForm>
      )
    }

    const renderDataAppend = () => {
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <OCollapse accordion={true}>
              <OCollapseItem
                title="添加数据"
                name="dataType"
                class="rounded m-1 border dark:border-zinc-500 border-zinc-200"
              >
                {renderDataSelect()}
              </OCollapseItem>
            </OCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              <OCard title="添加数据" class="my-1">
                {renderDataSelect()}
              </OCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div class="rounded my-1 p-4 border dark:border-zinc-500 border-zinc-200">
              <ODivider title-placement="left" class="my-2">
                {'添加数据'}
              </ODivider>
              {renderDataSelect()}
            </div>
          )
      }
    }
    return () =>
      Object.keys(dataState.plugins).length > 0 ? (
        <>
          {renderDataAppend()}
          {Object.keys(props.slotter.configs).map((el, index) => {
            const handler = props.slotter.configs[el]
            return renderContainer(handler.type, handler.id, index)
          })}
        </>
      ) : (
        useEmpty('未发现任何全局数据插件')
      )
  }
})
