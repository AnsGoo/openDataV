import { FormType } from '@/enum'
import { backgroundToCss } from '@/utils/utils'

export const cssTransfer = (type: FormType, _prop: string, value: any): Optional<Recordable> => {
  switch (type) {
    case FormType.BACKGROUND:
      return backgroundToCss(value)
    default:
      return undefined
  }
}
