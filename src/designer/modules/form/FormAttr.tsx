import { isUndefined } from 'lodash-es'
import type {
  CustomProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  MetaForm,
  ModalProps,
  RadioProps,
  SelectProps,
  SwitchProps
} from 'open-data-v/base'
import { FormType } from 'open-data-v/base'
import {
  OButton,
  OCard,
  OColorPicker,
  OForm,
  OFormItem,
  OInput,
  OInputGroup,
  OInputNumber,
  OModal,
  ORadio,
  ORadioGroup,
  OSelect,
  OSwitch
} from 'open-data-v/ui'
import type { PropType } from 'vue'
import { defineComponent, h, ref, watch } from 'vue'

import ArrayItem from '../arrayItem'
import BackItem from '../backItem'
import CustomItem from '../customItem'
import { GlobalColorSwatches } from '../enum'
import FontStyle from '../fontSytle'
import FontWeight from '../fontWeight'
import LinearGradient from '../linearGradient'

export default defineComponent({
  components: {
    FontStyle,
    FontWeight,
    LinearGradient,
    OSwitch,
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
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  },
  emits: ['change', 'updateData'],
  setup(props, { emit }) {
    const formData = ref<Record<string, any>>(props.data)
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
    const renderModal = (item: MetaForm, modelValue: Record<string, any>, path: Array<string>) => {
      const options = ((item || {}).props || {}) as ModalProps
      return (
        <>
          <OInputGroup>
            <OInput
              readonly={true}
              onClick={() => (isShow.value = true)}
              placeholder={options.placeholder}
              value={JSON.stringify(modelValue)}
            />
            <OButton type="primary" onClick={() => (isShow.value = true)}>
              {options.buttonText}
            </OButton>
          </OInputGroup>
          <OModal v-model:show={isShow.value} displayDirective="show">
            <OCard
              title={item.label || ''}
              style="width: 600px"
              size={options.size || 'small'}
              role="dialog"
              aria-modal={true}
              bordered={options.bordered || false}
              closable={true}
              onClose={() => (isShow.value = false)}
            >
              <OForm size="small" labelPlacement="left" labelAlign="left">
                {(item.children || []).map((el) => {
                  return (
                    <OFormItem
                      key={`${props.ukey}${item.prop}${el.prop}`}
                      label={el.label}
                      showLabel={isShowLabel(el.showLabel)}
                    >
                      {renderItem(el, modelValue, path)}
                    </OFormItem>
                  )
                })}
              </OForm>
            </OCard>
          </OModal>
        </>
      )
    }

    const renderFormItem = (
      item: MetaForm,
      modelValue: Record<string, any>,
      path: Array<string> = []
    ) => {
      let component: {} = OInput
      switch (item.type) {
        case FormType.SWITCH:
          component = OSwitch
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
      const options: Record<string, any>[] =
        (itemOptions as SelectProps | RadioProps | SwitchProps)?.options || []

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
            <OColorPicker
              v-model:value={modelValue[item.prop]}
              swatches={GlobalColorSwatches}
              modes={['hex', 'rgb', 'hsl']}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
            />
          )
        case FormType.SELECT:
          return (
            <OSelect
              v-model:value={modelValue[item.prop]}
              placeholder={item.label}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              options={options}
              clearable={true}
            />
          )
        case FormType.RADIO:
          return (
            <ORadioGroup
              v-model:value={modelValue[item.prop]}
              name={props.uid}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
            >
              {options.map((op) => (
                <ORadio value={op.value} key={op.value}>
                  {op.label}
                </ORadio>
              ))}
            </ORadioGroup>
          )
        case FormType.NUMBER:
          const numberMax: number = getOptionsValue<number>('max', 9999999999)
          const numberMin: number = getOptionsValue<number>('min', -9999999999)
          const precision: number | undefined = getOptionsValue<number>('precision', undefined)

          return (
            <OInputNumber
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              max={numberMax}
              min={numberMin}
              precision={precision}
              clearable={true}
              v-slots={{
                prefix: (itemOptions as InputNumberProps).prefix,
                suffix: (itemOptions as InputNumberProps).suffix
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
              component={(itemOptions as CustomProps).componentType}
              args={(itemOptions as CustomProps).args}
            />
          )
        default:
          return (
            <OInput
              clearable
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, [...path, item.prop])}
              readonly={itemOptions!.editable === false}
              disabled={itemOptions!.disabled}
              v-slots={{
                prefix: (itemOptions as InputProps).prefix,
                suffix: (itemOptions as InputProps).suffix
              }}
            />
          )
      }
    }
    return () => (
      <OForm>
        {props.children.map((item) => (
          <OFormItem
            key={`${props.ukey}${item.prop}`}
            label={item.label}
            showLabel={isShowLabel(item.showLabel)}
          >
            {isUndefined(formData.value) ? <></> : renderItem(item, formData.value, [props.uid])}
          </OFormItem>
        ))}
      </OForm>
    )
  }
})
