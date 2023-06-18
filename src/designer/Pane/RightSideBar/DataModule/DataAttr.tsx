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
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'

import useEmpty from '@/designer/modules/Empty'
import useDataState from '@/designer/state/data'
import { ContainerType } from '@/enum'
import { DataIntegrationMode, DataType } from '@/enum/data'
import type { CustomComponent } from '@/models'

export default defineComponent({
  props: {
    curComponent: {
      type: Object as PropType<CustomComponent>,
      required: true
    }
  },
  emits: ['change'],
  setup(props) {
    watch(
      () => props.curComponent,
      async (value: CustomComponent) => {
        if (value) {
          const dataConfig = props.curComponent.dataConfig
          if (dataConfig) {
            dataType.value = dataConfig.type
          }
        }
      },
      { deep: true, immediate: true }
    )
    onMounted(() => {
      const dataConfig = props.curComponent.dataConfig
      if (dataConfig) {
        dataType.value = dataConfig.type
      }
    })
    const dataState = useDataState()
    const dataType = ref<string>(DataType.DEMO)
    const renderDataComponent = () => {
      const dataComponent = dataState.getDataComponent(dataType.value)
      const DataComponent = dataComponent
        ? dataComponent.component
        : useEmpty('未发现相应的数据插件')
      // @ts-ignore
      return <DataComponent curComponent={props.curComponent} />
    }

    const typeChanged = (type: string) => {
      console.log(type)
      dataType.value = type
    }

    const renderForm = () => {
      return props.curComponent.dataIntegrationMode === DataIntegrationMode.UNIVERSAL ? (
        <NForm>
          <NFormItem key="dataType" label="数据类型">
            <NSelect
              v-model:value={dataType.value}
              placeholder="请选择数据类型"
              options={dataState.allDataType}
              onUpdateValue={(type: string) => typeChanged(type)}
              clearable={true}
            />
          </NFormItem>
          {renderDataComponent()}
        </NForm>
      ) : (
        <NDescriptions>
          <NDescriptionsItem>
            <NEmpty description="未发现数据配置项"></NEmpty>
          </NDescriptionsItem>
        </NDescriptions>
      )
    }
    const renderContainer = () => {
      const mode = props.curComponent.defaultViewType.data as ContainerType
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <NCollapse accordion={true}>
              <NCollapseItem title="数据选择" name="dataType">
                {renderForm()}
              </NCollapseItem>
            </NCollapse>
          )
        case ContainerType.TABS:
          return (
            <NTabs type="line">
              <NTabPane tab="数据选择" name="dataType">
                {renderForm()}
              </NTabPane>
            </NTabs>
          )
        case ContainerType.CARD:
          return (
            <NCard title="数据选择" size="small">
              {renderForm()}
            </NCard>
          )
        case ContainerType.FORM:
          return (
            <>
              <NDivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {'数据选择'}
              </NDivider>
              {renderForm()}
            </>
          )
        case ContainerType.TIMELINE:
          return (
            <NTimeline>
              <NTimelineItem title="数据选择" type={'success'}>
                {renderForm()}
              </NTimelineItem>
            </NTimeline>
          )
      }
    }
    return () => renderContainer()
  }
})
