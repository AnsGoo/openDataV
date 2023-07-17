import { isUndefined } from 'lodash-es'
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
import { defineComponent, h, ref, watch } from 'vue'

import { FormType, GlobalColorSwatches } from '@/enum'
import type {
  CustomFormSchema,
  FormItemProps,
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
  emits: ['change', 'updateData'],
  setup(props, { emit }) {
    const formData = ref<Recordable>(props.data)
    watch(
      () => props.data,
      () => {
        formData.value = props.data
      }
    )
    const changed = (val: any, keys: Array<string>) => {
      emit('change', keys, val)
      emit('updateData', props.ukey, formData)
    }
    const isShowLabel = (showLabel?: boolean) => showLabel !== false
    const isShow = ref<boolean>(false)
    const renderModal = (item: MetaForm, modelValue: Recordable, path: Array<string>) => {
      const options = ((item || {}).props || {}) as ModalFormSchema
      return (
        <>
          <NInputGroup>
            <NInput
              readonly={true}
              onClick={() => (isShow.value = true)}
              placeholder={options.placeholder}
              value={JSON.stringify(modelValue)}
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
                {(item.children || []).map((el) => {
                  return (
                    <NFormItem
                      key={`${props.ukey}${item.prop}${el.prop}`}
                      label={el.label}
                      showLabel={isShowLabel(el.showLabel)}
                    >
                      {renderItem(el, modelValue, path)}
                    </NFormItem>
                  )
                })}
              </NForm>
            </NCard>
          </NModal>
        </>
      )
    }

    const renderFormItem = (item: MetaForm, modelValue: Recordable, path: Array<string> = []) => {
      let component: {} = NInput
      switch (item.type) {
        case FormType.SWITCH:
          component = NSwitch
          break
        case FormType.FONT_STYLE:
          component = FontStyle
          break
        case FormType.FONT_WEIGHT:
          component = FontWeight
          break
        case FormType.LINEAR_GRADIENT:
          component = LinearGradient
          break
        case FormType.BACKGROUND:
          component = BackItem
          break
      }
      return h(component, {
        value: modelValue[item.prop],
        onUpdateValue: (value) => {
          modelValue[item.prop] = value
          changed(value, path)
        }
      })
    }
    const renderItem = (item: MetaForm, modelValue, path: Array<string> = []) => {
      if (!modelValue) {
        return <> </>
      }
      const itemOptions = (item.props || item.componentOptions || {}) as FormItemProps
      const options: Recordable[] =
        (itemOptions as SelectFormSchema | RadioFormSchema | SwitchFormSchema)?.options || []

      /**
       * 获取设置的值
       * @param {string} name 需要获取值的名称
       * @param {any} [defaultValue=undefined] 默认值
       * @return 返回值本体或默认值
       */
      function getOptionsValue<T = undefined>(name: string, defaultValue?: T): T {
        return name in itemOptions ? itemOptions[name] : defaultValue
      }

      switch (item.type) {
        case FormType.COLOR:
          return (
            <NColorPicker
              v-model:value={modelValue[item.prop]}
              swatches={GlobalColorSwatches}
              modes={['hex', 'rgb', 'hsl']}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
            />
          )
        case FormType.SELECT:
          return (
            <NSelect
              v-model:value={modelValue[item.prop]}
              placeholder={item.label}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              options={options}
              clearable={true}
            />
          )
        case FormType.RADIO:
          return (
            <NRadioGroup
              v-model:value={modelValue[item.prop]}
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
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              max={numberMax}
              min={numberMin}
              precision={precision}
              clearable={true}
              v-slots={{
                prefix: (itemOptions as InputNumberFormSchema).prefix,
                suffix: (itemOptions as InputNumberFormSchema).suffix
              }}
            />
          )
        case FormType.SWITCH:
        case FormType.FONT_STYLE:
        case FormType.FONT_WEIGHT:
        case FormType.LINEAR_GRADIENT:
        case FormType.BACKGROUND:
          return renderFormItem(item, modelValue, [...path, item.prop])
        case FormType.ARRAY:
          const count = getOptionsValue<number>('count', 1)
          const type = getOptionsValue<'static' | 'dynamic'>('type', 'static')
          const maxItem = getOptionsValue<number | undefined>('maxItem')
          const minItem = getOptionsValue<number>('minItem')
          return h(ArrayItem, {
            value: modelValue[item.prop],
            onUpdateValue: (value) => {
              modelValue[item.prop] = value
              changed(value, [...path, item.prop])
            },
            count,
            type,
            maxItem,
            minItem
          })
        case FormType.MODAL:
          const childModelValue = modelValue[item.prop]
          if (isUndefined(childModelValue)) {
            return <></>
          }
          return renderModal(item, childModelValue, [...path, item.prop])
        case FormType.CUSTOM:
          return (
            <CustomItem
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              component={(itemOptions as CustomFormSchema).componentType}
              args={(itemOptions as CustomFormSchema).args}
            />
          )
        default:
          return (
            <NInput
              clearable
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              readonly={itemOptions!.editable === false}
              disabled={itemOptions!.disabled}
              v-slots={{
                prefix: (itemOptions as InputFormSchema).prefix,
                suffix: (itemOptions as InputFormSchema).suffix
              }}
            />
          )
      }
    }
    return () => (
      <NForm>
        {props.children.map((item) => (
          <NFormItem
            key={`${props.ukey}${item.prop}`}
            label={item.label}
            showLabel={isShowLabel(item.showLabel)}
          >
            {isUndefined(formData.value) ? <></> : renderItem(item, formData.value, [props.uid])}
          </NFormItem>
        ))}
      </NForm>
    )
  }
})
