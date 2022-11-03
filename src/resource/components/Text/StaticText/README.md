[toc]

# 静态文本（`StaticText`）

> 展示一个静态文本，主要用于页面静态文本展示

<RenderComponent
  :config="StaticTextComponent"
  :component="StaticText"
  :prop-value="{
    base: {
      text: '我们一起建设OpenDataV吧',
      type: 'text'
    }
}"
  :style="{
  color: '#d03050',
  fontSize: 40,
  fontWeight: 800,
  width: 550,
  height: 100
}
"
  title="静态文本"
  mode="debug"
/>

## 版本信息

| 组件版本 | 平台版本 | 说明 |
| :------: | :------: | :--: |
|   1.0    |   1.0    | 可用 |

## 属性

### 基础属性

|    配置项    |        作用        | 说明 |
| :----------: | :----------------: | :--: |
| `自定义文本` | 静态文本的文件内容 |      |

## 样式

### 字体设置

| 配置项 | 作用 | 说明 |
| :-: | :-: | :-: |
| `颜色` | 文字颜色，支持 16 进制和 RGBA 颜色表示方法 |  |
| `字体大小` | 字体大小 |  |
| `字体宽度` | 字体宽度 | 100-900，必须是 100 的整倍数 |
| `字体` | 字体名称 | 保证该字体在本机上存在，否则采用浏览器默认字体 |

## 示例

<div class="demo">

<RenderComponent
  :config="StaticTextComponent"
  :component="StaticText"
  :prop-value="propValue"
  :style="style"
  title="静态文本"
/>

<RenderComponent
  :config="StaticTextComponent"
  :component="StaticText"
  :prop-value="symbolPropValue"
  :style="{
  color: '#18a058',
  fontSize: 40,
  fontWeight: 800,
  width: 450,
  height: 100
}"
  title="符号文本"
/>

</div>

<script setup lang="ts" name="StaticTextDoc">
import RenderComponent from '@/docs/RenderComponent.vue'
import StaticTextComponent from './config'
import StaticText from './StaticText.vue'
import type { StaticTextType } from './type'
const propValue: StaticTextType = {
  base: {
    text: 'OpenDataV',
    type: 'text'
  }
}
const style = {
  color: '#d03050',
  fontSize: 40,
  fontWeight: 800,
  width: 450,
  height: 100
}

const symbolPropValue:StaticTextType = {
  base: {
    text: 'icon-clock',
    type: 'symbol'
  }
}
</script>
