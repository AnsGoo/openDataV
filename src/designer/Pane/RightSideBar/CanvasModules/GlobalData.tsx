import {
  NCard,
  NCollapse,
  NCollapseItem,
  NDescriptions,
  NDescriptionsItem,
  NDivider,
  NEmpty,
  NForm,
  NFormItem,
  NSelect,
  NTabPane,
  NTabs,
  NTimeline,
  NTimelineItem
} from 'naive-ui'
import { defineComponent, onMounted, ref } from 'vue'

import useEmpty from '@/designer/modules/Empty'
import useCanvasState from '@/designer/state/canvas'
import useDataState from '@/designer/state/data'
import { ContainerType } from '@/enum'

const canvasState = useCanvasState()

export default defineComponent({
  props: {},
  emits: ['change'],
  setup(props) {
    const dataState = useDataState()
    const dataType = ref<string>('')
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
    const renderDataComponent = () => {
      const plugin = dataState.getPlugin(dataType.value)
      const DataComponent = plugin ? plugin.component : useEmpty('未发现相应的数据插件')
      // @ts-ignore
      return <DataComponent />
    }

    const typeChanged = (type: string) => {
      dataType.value = type
    }

    const renderData = () => {
      return (
        <NForm size="small" labelPlacement="top" labelAlign="left">
          <NFormItem key="dataType" label="数据类型">
            <NSelect
              v-model:value={dataType.value}
              placeholder="请选择数据类型"
              options={globalDataTypes.value}
              onUpdateValue={(type: string) => typeChanged(type)}
              clearable={true}
            />
          </NFormItem>
          {renderDataComponent()}
        </NForm>
      )
    }
    const renderContainer = () => {
      const mode = canvasState.canvasStyleConfig.mode as ContainerType
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <NCollapse accordion={true}>
              <NCollapseItem title="全局数据" name="dataType">
                {renderData()}
              </NCollapseItem>
            </NCollapse>
          )
        case ContainerType.TABS:
          return (
            <NTabs type="line">
              <NTabPane tab="全局数据" name="dataType">
                {renderData()}
              </NTabPane>
            </NTabs>
          )
        case ContainerType.CARD:
          return (
            <>
              <NCard title="全局数据" size="small">
                {renderData()}
              </NCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <>
              <NDivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {'全局数据'}
              </NDivider>
              {renderData()}
            </>
          )
        case ContainerType.TIMELINE:
          return (
            <NTimeline>
              <NTimelineItem title="全局数据" type={'success'}>
                {renderData()}
              </NTimelineItem>
            </NTimeline>
          )
      }
    }
    return () =>
      Object.keys(dataState.plugins).length > 0 ? (
        renderContainer()
      ) : (
        <NDescriptions>
          <NDescriptionsItem>
            <NEmpty description="未发现数据配置项"></NEmpty>
          </NDescriptionsItem>
        </NDescriptions>
      )
  }
})
