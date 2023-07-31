import {
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NDescriptions,
  NDescriptionsItem,
  NDivider,
  NEmpty,
  NForm,
  NFormItem,
  NInputGroup,
  NSelect,
  NTimeline,
  NTimelineItem
} from 'naive-ui'
import useEmpty from 'open-data-v/designer/modules/Empty'
import useCanvasState from 'open-data-v/designer/state/canvas'
import useDataState from 'open-data-v/designer/state/data'
import { ContainerType } from 'open-data-v/enum'
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
            <NCollapse accordion={true}>
              <NCollapseItem title={`全局数据${index + 1}`} name="dataType">
                {renderDataComponent(dataType, id)}
              </NCollapseItem>
            </NCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              <NCard
                title={`全局数据${index + 1}`}
                size="small"
                style={{ marginBottom: '0.25rem' }}
              >
                {renderDataComponent(dataType, id)}
              </NCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div style={{ padding: '0 1rem' }}>
              <NDivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {`全局数据${index + 1}`}
              </NDivider>
              {renderDataComponent(dataType, id)}
            </div>
          )
        case ContainerType.TIMELINE:
          return (
            <NTimeline>
              <NTimelineItem title={`全局数据${index + 1}`} type={'success'}>
                {renderDataComponent(dataType, id)}
              </NTimelineItem>
            </NTimeline>
          )
      }
    }

    const renderDataSelect = () => {
      return (
        <NForm size="small" labelPlacement="top" labelAlign="left">
          <NFormItem key="dataType" label="数据类型">
            <NInputGroup>
              <NSelect
                v-model:value={curDataType.value}
                placeholder="请选择数据类型"
                options={globalDataTypes.value}
                clearable={true}
              />
              <NButton type="success" onClick={appendGlobalData}>
                新增
              </NButton>
            </NInputGroup>
          </NFormItem>
        </NForm>
      )
    }

    const renderDataAppend = () => {
      const mode = canvasState.canvasStyleConfig.mode as ContainerType
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <NCollapse accordion={true}>
              <NCollapseItem title="添加数据" name="dataType">
                {renderDataSelect()}
              </NCollapseItem>
            </NCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              <NCard title="添加数据" size="small" style={{ marginBottom: '0.25rem' }}>
                {renderDataSelect()}
              </NCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div style={{ padding: '0 1rem' }}>
              <NDivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {'添加数据'}
              </NDivider>
              {renderDataSelect()}
            </div>
          )
        case ContainerType.TIMELINE:
          return (
            <NTimeline>
              <NTimelineItem title="添加数据" type={'success'}>
                {renderDataSelect()}
              </NTimelineItem>
            </NTimeline>
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
        <NDescriptions>
          <NDescriptionsItem>
            <NEmpty description="未发现任何全局数据插件"></NEmpty>
          </NDescriptionsItem>
        </NDescriptions>
      )
  }
})
