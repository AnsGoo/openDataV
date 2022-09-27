import { FormType } from '@/enum'

export const cssTransfer = (
  type: FormType,
  prop: string,
  value: any
): Optional<Recordable<any>> => {
  switch (type) {
    case FormType.BACKGROUND:
      return backgroundToCss(prop, value)
    default:
      return undefined
  }
}

const backgroundToCss = (_: string, value: any) => {
  if ('angle' in value) {
    return {
      backgroundImage: `linear-gradient(${value.angle}deg, ${value.color1}, ${value.color2})`
    }
  } else if (
    'backgroundImage' in value &&
    value['backgroundImage'] &&
    !value['backgroundImage'].startsWith('url')
  ) {
    value['backgroundImage'] = `url(${value['backgroundImage']})`
  }
  return value
}
