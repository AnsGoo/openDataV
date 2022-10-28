

# 静态文本（`StaticText`）

> 展示一个静态文本，主要用于页面静态文本展示

## 版本信息

|组件版本|平台版本|说明|
|:---:|:---:|:---:|
|1.0|1.0|可用|

## 属性

### 基础属性

|配置项|作用|说明|
|:---:|:---:|:---:|
|`自定义文本`| 静态文本的文件内容||


## 样式

### 字体设置

|配置项|作用|说明|
|:---:|:---:|:---:|
|`颜色`| 文字颜色，支持16进制和RGBA颜色表示方法||
|`字体大小`|字体大小||
|`字体宽度`|字体宽度|100-900，必须是100的整倍数|
|`字体`|字体名称|保证该字体在本机上存在，否则采用浏览器默认字体|


## 示例

- 效果图

<RenderCompoent
  :config="StaticTextComponent"
  :component="StaticText"
  :prop-value="propValue"
  :style="style"
  title="静态文本"
/>


<script setup lang="ts">
import RenderCompoent from '@/docs/RenderCompoent.vue'
import StaticTextComponent from './config'
import StaticText from './StaticText.vue'
import type { StaticTextType } from './type'
const propValue: StaticTextType = {
    base: {
      text: 'OpenDataV 哈哈哈',
      type: 'text'
    }
}
const style = {
  color: 'red',
  fontSize: 40,
  fontWeight: 800,
  width: 450,
  height: 100
}

</script>