import { reactive, defineComponent, PropType, resolveComponent, h } from 'vue'
import FontStyle from '../fontSytle'
import FontWeight from '../fontWeight'
import LinearGradient from '../linearGradient'
import ArrayItem from '../arrayItem'
import CustomRender from './utils/render'
import { FormType, GlobalColorSwatches } from '@/enum'
import type { AttrType, CustomFormSchema } from '@/types/component'
import {
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  NSelect,
  NSwitch,
  NInputNumber,
  NColorPicker
} from 'naive-ui'

export default defineComponent({
  components: {
    FontStyle,
    FontWeight,
    LinearGradient,
    NSwitch
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
      type: Array as PropType<AttrType[]>,
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

    const changed = (val: any, key: string) => {
      emit('change', key, val)
    }

    const renderItem = (item: AttrType) => {
      const options: Recordable[] = item.componentOptions?.options || []

      switch (item.type) {
        case FormType.COLOR:
          return (
            <NColorPicker
              v-model:value={formData[item.prop]}
              swatches={GlobalColorSwatches}
              modes={['hex', 'rgb', 'hsl']}
              onUpdateValue={(event) => changed(event, item.prop)}
            />
          )
        case FormType.SELECT:
          return (
            <NSelect
              v-model:value={formData[item.prop]}
              placeholder={item.label}
              onUpdateValue={(event) => changed(event, item.prop)}
              options={options}
            />
          )
        case FormType.RADIO:
          return (
            <NRadioGroup
              v-model:value={formData[item.prop]}
              placeholder={item.label}
              onUpdateValue={(event) => changed(event, item.prop)}
            >
              {options.map((op) => (
                <NRadio label={op.value} key={op.value}>
                  {op.label}
                </NRadio>
              ))}
            </NRadioGroup>
          )
        case FormType.NUMBER:
          const numberMax: number =
            'max' in item.componentOptions ? item.componentOptions.max : 9999999999
          const numberMin: number =
            'min' in item.componentOptions ? item.componentOptions.min : -9999999999

          return (
            <NInputNumber
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              max={numberMax}
              min={numberMin}
            />
          )
        case FormType.SWITCH:
        case FormType.FONT_STYLE:
        case FormType.FONT_WEIGHT:
        case FormType.LINEAR_GRADIENT:
          return h(resolveComponent(item.type), {
            value: formData[item.prop],
            ['onUpdate:value']: (value) => {
              formData[item.prop] = value
              changed(value, item.prop)
            }
          })
        case FormType.ARRAY:
          const max = 'max' in item.componentOptions ? item.componentOptions.max : 1
          const type = 'type' in item.componentOptions ? item.componentOptions.type : 'static'
          return h(ArrayItem, {
            value: formData[item.prop],
            ['onUpdate:value']: (value) => {
              formData[item.prop] = value
              changed(value, item.prop)
            },
            max,
            type
          })
        case FormType.CUSTOM:
          return (
            <CustomRender
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              component={(item.componentOptions as CustomFormSchema).componentType}
              args={(item.componentOptions as CustomFormSchema).args}
            />
          )
        default:
          return (
            <NInput
              clearable
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              readonly={item.componentOptions.editable === false ? true : false}
              disabled={item.componentOptions.disabled}
            />
          )
      }
    }
    return () => (
      <NForm size="small" labelPlacement="left" labelAlign="left">
        {props.children.map((item) => (
          <NFormItem key={`${props.ukey}${item.prop}`} label={item.label}>
            {renderItem(item)}
          </NFormItem>
        ))}
      </NForm>
    )
  }
})
