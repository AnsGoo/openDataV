import type { CustomComponent } from 'open-data-v/base'
import { ContainerType } from 'open-data-v/base'
import { DataMode, useDataState, useEmpty, useScriptState } from 'open-data-v/designer'
import {
  OCard,
  OCollapse,
  OCollapseItem,
  ODivider,
  OForm,
  OFormItem,
  OSelect
} from 'open-data-v/ui'
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  props: {
    curComponent: {
      type: Object as PropType<CustomComponent>,
      required: true
    }
  },
  emits: ['change'],
  setup(props) {
    const dataState = useDataState()
    const scriptState = useScriptState()
    const dataType = ref<string>('DEMO')
    const scriptType = ref<string | null>(null)
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

    const componentDataTypes = ref<Array<{ label: string; value: string }>>([])

    onMounted(() => {
      const keys = Object.keys(dataState.componentPlugins)
      keys.forEach((el) => {
        const plugin = dataState.componentPlugins[el]
        componentDataTypes.value.push({
          label: plugin.name,
          value: plugin.type
        })
      })
      const dataConfig = props.curComponent.dataConfig
      if (dataConfig) {
        dataType.value = dataConfig.type
      }
    })

    const scriptTypeChange = (type: string) => {
      scriptType.value = type
    }
    const renderDataComponent = () => {
      const plugin = dataState.getPlugin(dataType.value)
      const DataComponent = plugin ? plugin.component : useEmpty('未发现相应的数据插件')
      // @ts-ignore
      return <DataComponent slotter={props.curComponent} />
    }

    const renderScriptComponent = () => {
      if (!scriptType.value) {
        return
      }
      const plugin = scriptState.getPlugin(scriptType.value)
      const PluginComponent = plugin ? plugin.component : useEmpty('未发现相应的脚本插件')
      // @ts-ignore
      return <PluginComponent slotter={props.curComponent} />
    }

    const typeChanged = (type: string) => {
      dataType.value = type
    }

    const renderData = () => {
      return (
        <OForm size="small" labelPlacement="top">
          <OFormItem prop="dataType" label="数据类型">
            <OSelect
              v-model:value={dataType.value}
              placeholder="请选择数据类型"
              options={componentDataTypes.value}
              onUpdateValue={(type: string) => typeChanged(type)}
              clearable={true}
            />
          </OFormItem>
          {renderDataComponent()}
        </OForm>
      )
    }
    const renderScript = () => {
      return (
        <OForm size="small" labelPlacement="top">
          <OFormItem prop="scriptType" label="脚本类型">
            <OSelect
              v-model:value={scriptType.value}
              placeholder="请选择脚本类型"
              options={scriptState.allScriptType}
              onUpdateValue={(type: string) => scriptTypeChange(type)}
              clearable={true}
            />
          </OFormItem>
          {renderScriptComponent()}
        </OForm>
      )
    }
    const renderContainer = () => {
      const mode = props.curComponent.defaultViewType as ContainerType
      switch (mode) {
        case ContainerType.COLLAPSE:
          return (
            <OCollapse accordion={true}>
              <OCollapseItem title="数据选择" name="dataType">
                {renderData()}
              </OCollapseItem>
              <OCollapseItem title="脚本配置" name="scriptOptions">
                {renderScript()}
              </OCollapseItem>
            </OCollapse>
          )
        case ContainerType.CARD:
          return (
            <>
              <OCard title="数据选择" style={{ marginBottom: '0.25rem' }}>
                {renderData()}
              </OCard>
              <OCard title="脚本配置" style={{ marginBottom: '0.25rem' }}>
                {renderScript()}
              </OCard>
            </>
          )
        case ContainerType.FORM:
          return (
            <div style={{ padding: '0 1rem' }}>
              <ODivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {'数据选择'}
              </ODivider>
              {renderData()}
              <ODivider title-placement="left" style={{ marginTop: '0px', marginBottom: '0px' }}>
                {'脚本配置'}
              </ODivider>
              {renderScript()}
            </div>
          )
      }
    }
    return () =>
      props.curComponent.dataMode || props.curComponent.dataIntegrationMode === DataMode.UNIVERSAL
        ? renderContainer()
        : useEmpty('未发现数据配置项')
  }
})
