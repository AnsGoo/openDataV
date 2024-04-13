import iconMap from './icon/index'
import { useIcon } from './use-icon'

const keys = Object.keys(iconMap)
const icons = {}
keys.forEach((el) => {
  icons[el] = useIcon(el, iconMap[el])
})

export default { ...icons }
