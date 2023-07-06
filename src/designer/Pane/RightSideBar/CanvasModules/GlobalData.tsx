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
  NTabPane,
  NTabs,
  NTimeline,
  NTimelineItem
} from 'naive-ui'
import { computed, defineComponent, onMounted, ref } from 'vue'

import useEmpty from '@/designer/modules/Empty'
import useCanvasState from '@/designer/state/canvas'
import useDataState from '@/designer/state/data'
import { ContainerType } from '@/enum'

const canvasState = useCanvasState()

export default defineComponent({
  props: {},
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
    const renderDataComponent = (dataType: string, index: number) => {
      const plugin = dataState.getPlugin(dataType)
      const DataComponent = plugin ? plugin.component : useEmpty('未发现相应的数据插件')
      // @ts-ignore
      return <DataComponent index={index} />
    }

    const appendGlobalData = () => {
      if (curDataType.value) {
        canvasState.appendGlobalData(curDataType.value)
      }
    }

    const dataOptions = computed<Array<{ type: string; option: any }>>(() => canvasState.globalData)
    const renderContainer = (dataType: string, index: number) => {
      const mode = canvasState.canvasStyleConfig.mode as ContainerType
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <NCollapse accordion={true}>
              <NCollapseItem title={`全局数据${index + 1}`} name="dataType">
                {renderDataComponent(dataType, index)}
              </NCollapseItem>
            </NCollapse>
          )
        case ContainerType.TABS:
          return (
            <NTabs type="line">
              <NTabPane tab={`全局数据${index + 1}`} name="dataType">
                {renderDataComponent(dataType, index)}
              </NTabPane>
            </NTabs>
          )
        case ContainerType.CARD:
          return (
            <>
              <NCard title={`全局数据${index + 1}`} size="small">
                {renderDataComponent(dataType, index)}
              </NCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <>
              <NDivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {`全局数据${index + 1}`}
              </NDivider>
              {renderDataComponent(dataType, index)}
            </>
          )
        case ContainerType.TIMELINE:
          return (
            <NTimeline>
              <NTimelineItem title={`全局数据${index + 1}`} type={'success'}>
                {renderDataComponent(dataType, index)}
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
        case ContainerType.TABS:
          return (
            <NTabs type="line">
              <NTabPane tab="添加数据" name="dataType">
                {renderDataSelect()}
              </NTabPane>
            </NTabs>
          )
        case ContainerType.CARD:
          return (
            <>
              <NCard title="添加数据" size="small">
                {renderDataSelect()}
              </NCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <>
              <NDivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {'添加数据'}
              </NDivider>
              {renderDataSelect()}
            </>
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

          {dataOptions.value.map((el, index) => renderContainer(el.type, index))}
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
