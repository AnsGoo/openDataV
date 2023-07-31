import { FormType } from 'open-data-v/enum'

const filterValue = {
  key: 'filterValue',
  name: '过滤数据',
  extendParams: [
    {
      label: '过滤key',
      prop: 'key',
      type: FormType.TEXT,
      props: {
        defaultValue: 'value',
        placeholder: '请输入过滤key值'
      }
    },
    {
      label: '上限',
      prop: 'topLimit',
      type: FormType.NUMBER,
      props: {
        defaultValue: undefined,
        placeholder: '过滤的最大值'
      }
    },
    {
      label: '下限',
      prop: 'lowLimit',
      type: FormType.NUMBER,
      props: {
        defaultValue: undefined,
        placeholder: '过滤的最小值'
      }
    }
  ],
  func: (
    data: Array<{
      value: number
      [key: string]: any
    }>,
    params: {
      key: string
      topLimit: number
      lowLimit: number
    } = {
      key: 'value',
      topLimit: +Infinity,
      lowLimit: -Infinity
    }
  ) => {
    const { key, topLimit, lowLimit } = params
    return data.filter((el) => el[key] > lowLimit && el[key] < topLimit)
  }
}

export default {
  filterValue
}
