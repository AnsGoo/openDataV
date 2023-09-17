import { ContainerType } from 'open-data-v/base'
import { useCanvasState, useDataState, useEmpty } from 'open-data-v/designer'
import {
  OButton,
  OCard,
  OCollapse,
  OCollapseItem,
  ODivider,
  OForm,
  OFormItem,
  OInputGroup,
  OSelect,
  OTimeline,
  OTimelineItem
} from 'open-data-v/ui'
import { computed, defineComponent, onMounted, ref } from 'vue'

const canvasState = useCanvasState()

export default defineComponent({
  emits: ['change'],
  setup(_props) {
    const dataState = useDataState()
    const curDataType = ref<string>('')
    const globalDataTypes = ref<Array<{ label: string; value: string }>>([])

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
      return <DataComponent slotter={slotter} />
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
      const mode = canvasState.canvasStyleConfig.mode as ContainerType
      // let mode = ContainerType.TIMELINE
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <OCollapse accordion={true}>
              <OCollapseItem title={`全局数据${index + 1}`} name="dataType">
                {renderDataComponent(dataType, id)}
              </OCollapseItem>
            </OCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              <OCard
                title={`全局数据${index + 1}`}
                size="small"
                style={{ marginBottom: '0.25rem' }}
              >
                {renderDataComponent(dataType, id)}
              </OCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div style={{ padding: '0 1rem' }}>
              <ODivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {`全局数据${index + 1}`}
              </ODivider>
              {renderDataComponent(dataType, id)}
            </div>
          )
        case ContainerType.TIMELINE:
          return (
            <OTimeline>
              <OTimelineItem title={`全局数据${index + 1}`} type={'success'}>
                {renderDataComponent(dataType, id)}
              </OTimelineItem>
            </OTimeline>
          )
      }
    }

    const renderDataSelect = () => {
      return (
        <OForm size="small" labelPlacement="top" labelAlign="left">
          <OFormItem key="dataType" label="数据类型">
            <OInputGroup>
              <OSelect
                v-model:value={curDataType.value}
                placeholder="请选择数据类型"
                options={globalDataTypes.value}
                clearable={true}
              />
              <OButton type="success" onClick={appendGlobalData}>
                新增
              </OButton>
            </OInputGroup>
          </OFormItem>
        </OForm>
      )
    }

    const renderDataAppend = () => {
      const mode = canvasState.canvasStyleConfig.mode as ContainerType
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <OCollapse accordion={true}>
              <OCollapseItem title="添加数据" name="dataType">
                {renderDataSelect()}
              </OCollapseItem>
            </OCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              <OCard title="添加数据" size="small" style={{ marginBottom: '0.25rem' }}>
                {renderDataSelect()}
              </OCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div style={{ padding: '0 1rem' }}>
              <ODivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {'添加数据'}
              </ODivider>
              {renderDataSelect()}
            </div>
          )
        case ContainerType.TIMELINE:
          return (
            <OTimeline>
              <OTimelineItem title="添加数据" type={'success'}>
                {renderDataSelect()}
              </OTimelineItem>
            </OTimeline>
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
