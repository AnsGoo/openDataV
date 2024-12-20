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
import { computed, defineComponent, inject, onMounted, ref } from 'vue'

import { PANEL_MODEL } from '../../const'
import { useEmpty } from '../../modules'
import { useCanvasState, useDataState } from '../../state'

export default defineComponent({
  emits: ['change'],
  setup(_props) {
    const dataState = useDataState()
    const curDataType = ref<string>('')
    const globalDataTypes = ref<Array<{ label: string; value: string }>>([])
    const mode = inject<ContainerType>(PANEL_MODEL, ContainerType.COLLAPSE)
    const canvasState = useCanvasState()

    onMounted(() => {
      const keys = Object.keys(dataState.globalPlugins)
      keys.forEach((el) => {
        const plugin = dataState.globalPlugins[el]
        globalDataTypes.value.push({
          label: plugin.name,
          value: plugin.type
        })
      })
    })
    const renderDataComponent = (dataType: string, id: string) => {
      const plugin = dataState.getPlugin(dataType)
      const DataComponent = plugin ? plugin.component : useEmpty('未发现相应的数据插件')
      const slotter = canvasState.getDataSlotter(id)
      return <DataComponent slotter={slotter} handler={plugin.handler} />
    }

    const appendGlobalData = () => {
      if (curDataType.value) {
        canvasState.appendDataSlotter(curDataType.value)
      }
    }

    const dataOptions = computed<Array<{ id: string; type: string }>>(() => {
      const keys = Object.keys(canvasState.globalSlotters)
      return keys.map((el) => {
        return {
          id: el,
          type: canvasState.getDataSlotter(el).type
        }
      })
    })
    const renderContainer = (dataType: string, id: string, index: number) => {
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <OCollapse accordion={true}>
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
              <OCard title={`全局数据${index + 1}`} class="my-1">
                {renderDataComponent(dataType, id)}
              </OCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div class="rounded my-1 p-4 border dark:border-zinc-500 border-zinc-200">
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
          {dataOptions.value.map((el, index) => renderContainer(el.type, el.id, index))}
        </>
      ) : (
        useEmpty('未发现任何全局数据插件')
      )
  }
})
