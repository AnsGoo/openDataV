import { FormType } from '@/enum'
import { backgroundToCss } from '@/utils/utils'

export const cssTransfer = (
  type: FormType,
  prop: string,
  value: any
): Optional<Recordable<any>> => {
  switch (type) {
    case FormType.BACKGROUND:
      return backgroundToCss(value)
    default:
      console.log(prop)
      return undefined
  }
}
