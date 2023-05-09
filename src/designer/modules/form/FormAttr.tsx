import {
  NButton,
  NCard,
  NColorPicker,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NInputNumber,
  NModal,
  NRadio,
  NRadioGroup,
  NSelect,
  NSwitch
} from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, h, reactive, ref, resolveComponent } from 'vue'

import { FormType, GlobalColorSwatches } from '@/enum'
import type {
  CustomFormSchema,
  InputFormSchema,
  InputNumberFormSchema,
  MetaForm,
  ModalFormSchema,
  RadioFormSchema,
  SelectFormSchema,
  SwitchFormSchema
} from '@/types/component'

import ArrayItem from '../arrayItem'
import BackItem from '../backItem'
import CustomItem from '../customItem'
import FontStyle from '../fontSytle'
import FontWeight from '../fontWeight'
import LinearGradient from '../linearGradient'

export default defineComponent({
  components: {
    FontStyle,
    FontWeight,
    LinearGradient,
    NSwitch,
    BackItem
  },
  props: {
    name: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    ukey: {
      type: String,
      required: true
    },
    children: {
      type: Array as PropType<MetaForm[]>,
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
    const changed = (val: any, keys: Array<string>) => {
      emit('change', keys, val)
    }

    const isShowLabel = (showLabel?: boolean) => showLabel !== false
    const isShow = ref<boolean>(true)
    const renderModal = (item: MetaForm, path: Array<string>) => {
      const options = ((item || {}).props || {}) as ModalFormSchema
      return (
        <>
          <NInputGroup>
            <NInput
              readonly={true}
              onClick={() => (isShow.value = true)}
              placeholder={options.placeholder}
            />
            <NButton type="primary" onClick={() => (isShow.value = true)}>
              {options.buttonText}
            </NButton>
          </NInputGroup>
          <NModal v-model:show={isShow.value} displayDirective="show">
            <NCard
              title={item.label || ''}
              style="width: 600px"
              size={options.size || 'small'}
              role="dialog"
              aria-modal={true}
              bordered={options.bordered || false}
              closable={true}
              onClose={() => (isShow.value = false)}
            >
              <NForm size="small" labelPlacement="left" labelAlign="left">
                {options.context.children.map((el) => {
                  return (
                    <NFormItem
                      key={`${props.ukey}${item.prop}${el.prop}`}
                      label={el.label}
                      showLabel={isShowLabel(el.showLabel)}
                    >
                      {renderItem(el, path)}
                    </NFormItem>
                  )
                })}
              </NForm>
            </NCard>
          </NModal>
        </>
      )
    }
    const renderItem = (item: MetaForm, path: Array<string> = []) => {
      const options: Recordable[] =
        (item.props as SelectFormSchema | RadioFormSchema | SwitchFormSchema)?.options || []

      /**
       * 获取设置的值
       * @param {string} name 需要获取值的名称
       * @param {any} [defaultValue=undefined] 默认值
       * @return 返回值本体或默认值
       */
      function getOptionsValue<T = undefined>(name: string, defaultValue?: T): T {
        return name in (item.props || {}) ? item.props![name] : defaultValue
      }

      switch (item.type) {
        case FormType.COLOR:
          return (
            <NColorPicker
              v-model:value={formData[item.prop]}
              swatches={GlobalColorSwatches}
              modes={['hex', 'rgb', 'hsl']}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
            />
          )
        case FormType.SELECT:
          return (
            <NSelect
              v-model:value={formData[item.prop]}
              placeholder={item.label}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              options={options}
              clearable={true}
            />
          )
        case FormType.RADIO:
          return (
            <NRadioGroup
              v-model:value={formData[item.prop]}
              name={props.uid}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
            >
              {options.map((op) => (
                <NRadio value={op.value} key={op.value}>
                  {op.label}
                </NRadio>
              ))}
            </NRadioGroup>
          )
        case FormType.NUMBER:
          const numberMax: number = getOptionsValue<number>('max', 9999999999)
          const numberMin: number = getOptionsValue<number>('min', -9999999999)
          const precision: number | undefined = getOptionsValue<number>('precision', undefined)

          return (
            <NInputNumber
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              max={numberMax}
              min={numberMin}
              precision={precision}
              clearable={true}
              v-slots={{
                prefix: (item.props as InputNumberFormSchema).prefix,
                suffix: (item.props as InputNumberFormSchema).suffix
              }}
            />
          )
        case FormType.SWITCH:
        case FormType.FONT_STYLE:
        case FormType.FONT_WEIGHT:
        case FormType.LINEAR_GRADIENT:
        case FormType.BACKGROUND:
          return h(resolveComponent(item.type), {
            value: formData[item.prop],
            onUpdateValue: (value) => {
              formData[item.prop] = value
              changed(value, [...path, item.prop])
            }
          })
        case FormType.ARRAY:
          const count = getOptionsValue<number>('count', 1)
          const type = getOptionsValue<'static' | 'dynamic'>('type', 'static')
          const maxItem = getOptionsValue<number | undefined>('maxItem')
          const minItem = getOptionsValue<number>('minItem')
          return h(ArrayItem, {
            value: formData[item.prop],
            onUpdateValue: (value) => {
              formData[item.prop] = value
              changed(value, [...path, item.prop])
            },
            count,
            type,
            maxItem,
            minItem
          })
        case FormType.MODAL:
          return renderModal(item, [...path, item.prop])
        case FormType.CUSTOM:
          return (
            <CustomItem
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              component={(item.props as CustomFormSchema).componentType}
              args={(item.props as CustomFormSchema).args}
            />
          )
        default:
          return (
            <NInput
              clearable
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              readonly={item.props!.editable === false}
              disabled={item.props!.disabled}
              v-slots={{
                prefix: (item.props as InputFormSchema).prefix,
                suffix: (item.props as InputFormSchema).suffix
              }}
            />
          )
      }
    }
    return () => (
      <NForm size="small" labelPlacement="left" labelAlign="left">
        {props.children.map((item) => (
          <NFormItem
            key={`${props.ukey}${item.prop}`}
            label={item.label}
            showLabel={isShowLabel(item.showLabel)}
          >
            {renderItem(item, [props.uid])}
          </NFormItem>
        ))}
      </NForm>
    )
  }
})
