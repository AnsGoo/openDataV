import { BorderBox1, StaticText, SubText } from '@resources/components'

import { CategoryEnum } from './enum'

const components = {
  [CategoryEnum.TEXT]: [
    {
      name: StaticText.manifest.name,
      title: StaticText.manifest.title
    },
    { name: SubText.manifest.name, title: SubText.manifest.title }
  ],
  [CategoryEnum.BORDER]: [{ name: BorderBox1.manifest.name, title: BorderBox1.manifest.title }]
}

export default components
