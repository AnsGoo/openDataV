import{_ as o}from"./006-b5ec0171.js";import{o as t,c as d,W as c}from"./index-3ca9a95a.js";const l={class:"markdown-body"},a=c('<p><div class="toc-box"><ul><li><a href="javascript:document.querySelector(&#39;#_2&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">基础知识</a></li><ul><li><a href="javascript:document.querySelector(&#39;#_4&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">入门须知</a></li></ul><li><a href="javascript:document.querySelector(&#39;#_12&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">编辑器</a></li><li><a href="javascript:document.querySelector(&#39;#_26&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件</a></li><ul><li><a href="javascript:document.querySelector(&#39;#_35&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件名</a></li><li><a href="javascript:document.querySelector(&#39;#_39&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件配置项对象</a></li><li><a href="javascript:document.querySelector(&#39;#_90&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件渲染模板对象</a></li><li><a href="javascript:document.querySelector(&#39;#_102&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件分类</a></li><li><a href="javascript:document.querySelector(&#39;#_124&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件属性</a></li><li><a href="javascript:document.querySelector(&#39;#_192&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件样式</a></li><ul><li><a href="javascript:document.querySelector(&#39;#_194&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">公共样式</a></li><li><a href="javascript:document.querySelector(&#39;#_197&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">其他样式</a></li></ul><li><a href="javascript:document.querySelector(&#39;#Form_201&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件可用Form类型</a></li><li><a href="javascript:document.querySelector(&#39;#_305&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">监听组件属性</a></li><ul><li><a href="javascript:document.querySelector(&#39;#watch__311&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">watch 观测</a></li><li><a href="javascript:document.querySelector(&#39;#computed__329&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">computed 计算属性</a></li><li><a href="javascript:document.querySelector(&#39;#hooks_341&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">hooks</a></li><li><a href="javascript:document.querySelector(&#39;#_356&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">注意事项</a></li></ul><li><a href="javascript:document.querySelector(&#39;#_360&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">数据</a></li><ul><li><a href="javascript:document.querySelector(&#39;#SELF_370&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">SELF</a></li><li><a href="javascript:document.querySelector(&#39;#UNIVERSAL_396&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">UNIVERSAL</a></li><li><a href="javascript:document.querySelector(&#39;#GLOBAL_424&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">GLOBAL</a></li></ul></ul><li><a href="javascript:document.querySelector(&#39;#_429&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">监听组件尺寸</a></li><li><a href="javascript:document.querySelector(&#39;#_435&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">编辑器模式</a></li><li><a href="javascript:document.querySelector(&#39;#_469&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">常用指令</a></li><li><a href="javascript:document.querySelector(&#39;#_486&#39;).scrollIntoView({behavior: &#39;smooth&#39;})">组件文档</a></li></ul></div></p><h1><a id="_2"></a>基础知识</h1><h2><a id="_4"></a>入门须知</h2><ol><li><p>本项目是基于<code>Vue3</code>开发，所有的组件都符合<code>Vue3</code>知识，对于<code>Vue3</code>知识不熟悉的同学建议，先学习<code>Vue3</code>相关知识</p></li><li><p>本项目是采用<code>TypeScript</code>开发，若对于<code>TypeScript</code>知识欠缺的，可先熟悉一下<code>TypeScript</code></p></li><li><p>本项目中所有的组件只能在本项目中使用，无法保证在别的平台同样适用</p></li></ol><h1><a id="_12"></a>编辑器</h1><p>编辑器承载与渲染组件的容器，编辑提供了组件<code>拉伸</code>、<code>旋转</code>、<code>置顶</code>、<code>置底</code>、<code>组合</code>、<code>拆分</code>的能力，编辑器如下图：</p><p><img src="'+o+`" alt="create"></p><p>编辑器主要由以下功能分区组成：</p><blockquote><ul><li>顶部的<code>工具栏</code>： 常用工具按钮</li><li>左侧的<code>资源栏</code>： 组件和图层</li><li>右侧的<code>属性栏</code>： 属性分为组件属性和画布属性</li><li>底部的<code>状态栏</code>： 创建页面的状态</li><li>中间的<code>画布</code>： 承载组件的最顶层容器</li></ul></blockquote><h1><a id="_26"></a>组件</h1><p>一个完整的组件又以下属性构成</p><blockquote><ul><li><code>componentName</code>：组件名</li><li><code>component</code>： 组件对象渲染模板</li><li><code>config</code>：组件配置项对象</li><li><code>docs</code>：组件说明文档</li></ul></blockquote><h2><a id="_35"></a>组件名</h2><p>组件名必须保证全局唯一，因为组件会被挂载到<code>Vue3</code>实例对象上</p><h2><a id="_39"></a>组件配置项对象</h2><p>配置项对象是继承了 <code>CustomComponent</code> 抽象类的子类，在这里我们以静态文本为例</p><pre><code class="language-typescript">
/**
 * {component}: 组件名
 * {group}: 组件分类
 * {name}: 组件label
 * {id}: 组件ID
 * {width}: 组件初始化长度
 * {height}: 组件初始化高度
 * {icon? }: 组件图标
 * {dataIntegrationMode? }: 数据接入模式
 */

class StaticTextComponent extends CustomComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TEXT,
      name: name ? name : &#39;静态文本&#39;,
      id,
      width: 150,
      height: 20,
      icon,
      dataIntegrationMode: DataIntegrationMode.SELF
    })
  }
}

</code></pre><p>各个属性含义</p><blockquote><ul><li><code>component</code>: 组件名</li><li><code>group</code>: 组件分类</li><li><code>name</code>: 组件label</li><li><code>id</code>: 组件ID</li><li><code>width</code>: 组件初始化长度</li><li><code>height</code>: 组件初始化高度</li><li><code>icon? </code>: 组件图标</li><li><code>dataIntegrationMode? </code>: 数据接入模式</li></ul></blockquote><p>除过需要继承<code>CustomComponent</code> 抽象类外，还需要重新定义<code>_prop</code>和<code>_style</code>属性，</p><blockquote><ul><li><code>_prop属性</code>:定义了组件可以更改的属性</li></ul></blockquote><blockquote><ul><li><code>_style</code>: 定义了组件的外在的CSS样式</li></ul></blockquote><h2><a id="_90"></a>组件渲染模板对象</h2><p>组件渲染模板对象是一个特殊的<code>Vue3</code>组件对象， 这个组件对象有一个<code>component</code>配置项对象,这里我展示Vue3 <code>setup script</code> 写法</p><pre><code class="language-typescript">
const props = defineProps&lt;{
  component: StaticTextComponent
}&gt;()

</code></pre><h2><a id="_102"></a>组件分类</h2><p>目前组件分为 16类，分别是</p><ul><li><code>BASIC</code>: 基础组件</li><li><code>BORDER</code>: 边框组件</li><li><code>DECORATION</code>: 装饰组件</li><li><code>LINE</code>: 线状图组件</li><li><code>BAR</code>: 柱状图组件</li><li><code>PIE</code>: 饼状图组件</li><li><code>MAP</code>: 地图组件</li><li><code>GAUGE</code>: 仪表盘组件</li><li><code>CUSTOM</code>: 自定义组件</li><li><code>TEXT</code>: 文本组件</li><li><code>TABLE</code>: 表格组件</li><li><code>NAVIFATION</code>: 导航组件</li><li><code>PROGERSS</code>: 进度条组件</li><li><code>THERMOMETER</code>: 温度计组件</li><li><code>OTHER</code>: 其他组件</li></ul><p>用户按照组件特性选择对应的组件类型即可</p><h2><a id="_124"></a>组件属性</h2><p>组件属性是定义了组件在编辑器右侧<code>属性栏</code>中的<code>属性</code>的可配置项</p><p>组件属性的由属性配置项对象<code>MetaContainerItem</code>和组件属性值对象构成</p><pre><code class="language-typescript">
  [
    {
      label: &#39;基础配置&#39;,
      prop: &#39;base&#39;,
      children: [
        {
          prop: &#39;type&#39;,
          label: &#39;文本类型&#39;,
          type: FormType.SELECT,
          props: {
            defaultValue: &#39;text&#39;,
            options: [
              { value: &#39;text&#39;, label: &#39;文本&#39; },
              { value: &#39;symbol&#39;, label: &#39;符号&#39; }
            ]
          }
        },
        {
          prop: &#39;text&#39;,
          label: &#39;自定义文本&#39;,
          type: FormType.TEXT,
          props: {
            defaultValue: &#39;OpenDataV&#39;
          }
        }
      ]
    }
  ]

</code></pre><p>该配置项对应的组件属性分别是</p><pre><code class="language-typescript">
StaticTextType {
  base: {
    text: string
    type: &#39;text&#39; | &#39;symbol&#39;
  }
}


</code></pre><p>属性配置项对象<code>MetaContainerItem</code></p><ul><li><code>label</code>: 分类标签</li><li><code>prop</code>: 分类值</li><li><code>children</code>: <code>AttrType</code>子属性配置项集合</li></ul><p><code>AttrType</code>子属性配置项</p><ul><li><code>label</code>: 值标签</li><li><code>prop</code>: 属性值</li><li><code>type</code>: 属性值的Form类型</li><li><code>showLabel</code>: 是否显示标签</li><li><code>props</code>: Form组件配置</li><li><code>help</code>: Form帮助信息</li></ul><h2><a id="_192"></a>组件样式</h2><h3><a id="_194"></a>公共样式</h3><p>所有的组件都有<code>位置大小</code>这个公共样式，公共样式主要是组件在画布中的<code>坐标</code>、<code>尺寸</code>和<code>旋转度</code>三个类属性</p><h3><a id="_197"></a>其他样式</h3><p>其他样式组件属性的定义类似，只不过组件属性，需要你在组件中根据业务将属性值渲染出来，但是组件样式是里面的子属性值要求必须是CSS属性，本平台已经实现了常见的CSS样式渲染</p><h2><a id="Form_201"></a>组件可用Form类型</h2><p>本平台已经实现了常用的Form类型，例如：</p><blockquote><ul><li><code>TEXT</code>: Input框</li><li><code>TEXTAREA</code>: 文本域</li><li><code>NUMBER</code>: 数字输入框</li><li><code>SELECT</code>: 选择器</li><li><code>COLOR</code>: 色盘</li><li><code>RADIO</code>: 单选框</li><li><code>SWITCH</code>: 开关</li></ul></blockquote><p>以及平台定制的Form类型， 例如：</p><blockquote><ul><li><code>FONT_STYLE</code>: 字体选择</li><li><code>FONT_WEIGHT</code>: 字重选择</li><li><code>ARRAY</code>: 动态列表Form</li><li><code>BACKGROUND</code>: 背景选择</li><li><code>LINEAR_GRADIENT</code>: 渐变色</li></ul></blockquote><p>还有支持用户自定义<code>Form</code></p><blockquote><p>-<code>CUSTOM</code>: 自定义Form</p></blockquote><p><strong>Form公共属性</strong></p><p>所有的Form 都有如下属性，其次每一种Form类型可能拥有自己独有的属性</p><table><thead><tr><th>属性名</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>editable</td><td>是否可编辑</td><td>bool型</td></tr><tr><td>disabled</td><td>是否禁用</td><td>bool型</td></tr><tr><td>required</td><td>是否必须</td><td>bool型</td></tr><tr><td>defaultValue</td><td>默认值</td><td>任意类型</td></tr><tr><td>options</td><td>自有配置项</td><td>任意类型</td></tr></tbody></table><ol><li>TEXT Form属性</li></ol><p>无专有属性</p><ol start="2"><li>NUMBER Form属性</li></ol><table><thead><tr><th>属性名</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>min</td><td>最小值</td><td>数字型</td></tr><tr><td>max</td><td>最大值</td><td>数字型</td></tr><tr><td>step</td><td>步长</td><td>数字型</td></tr></tbody></table><ol start="3"><li>SELECT Form属性</li></ol><table><thead><tr><th>属性名</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>options</td><td>选项列表</td><td><code>Array&lt;{value:any, label:string}&gt;</code></td></tr></tbody></table><ol start="4"><li>SWITCH Form属性</li></ol><table><thead><tr><th>属性名</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>options</td><td>选项列表</td><td><code>Array&lt;{value:any, label:string}&gt;</code></td></tr></tbody></table><ol start="5"><li>RADIO Form属性</li></ol><table><thead><tr><th>属性名</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>options</td><td>选项列表</td><td><code>Array&lt;{value:any, label:string}&gt;</code></td></tr></tbody></table><ol start="6"><li>ARRAY Form 属性</li></ol><table><thead><tr><th>属性名</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>count</td><td>数量</td><td>数字型</td></tr><tr><td>type</td><td>类型</td><td><code>static</code>长度不可变，<code>dynamic</code>长度可变</td></tr><tr><td>maxItem</td><td>最大数量</td><td>数字型</td></tr><tr><td>minItem</td><td>最小数量</td><td>数字型</td></tr></tbody></table><ol start="7"><li>CUSTOM Form 属性</li></ol><table><thead><tr><th>属性名</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td>componentType</td><td>组件</td><td>Form组件</td></tr><tr><td>args</td><td>组件参数</td><td>任何类型</td></tr></tbody></table><ol start="8"><li>自定义Form类型</li></ol><p>我们自定义Form类型，自定义Form组件需要实现属性<code>value</code>和<code>update:value</code>的<code>emit</code>方法,具体详见本平台<code>FONT_STYLE</code>或者<code>BACKGROUND</code>等平台定制Form组件</p><pre><code class="language-typescript">const props = withDefaults(
  defineProps&lt;{
    value?: number
  }&gt;(),
  {
    value: 400
  }
)

const emits = defineEmits&lt;{
  (e: &#39;update:value&#39;, weight: number): void
  (e: &#39;change&#39;, weight: number): void
}&gt;()
</code></pre><h2><a id="_305"></a>监听组件属性</h2><p>当用户通过<code>属性栏</code>的<code>属性</code>更改组件属性时，画布中的组件需要根据用户更改来，对组件进行重新渲染。</p><p>监听组件属性变化有三种方式</p><h3><a id="watch__311"></a>watch 观测</h3><p>可以通过深度监听，监听组件 <code>component</code>属性对象的<code>propValue</code>属性或者子属性来监听组件属性更改</p><pre><code class="language-typescript">
const customeText = ref&lt;string&gt;(props.propValue.base.text)

watch( 
  () =&gt; props.propValue.base.text,
  (value: string) =&gt; {
    customeText.value = value
  }

)

</code></pre><h3><a id="computed__329"></a>computed 计算属性</h3><p>也可以通过computed计算组件 <code>component</code>属性对象的<code>propValue</code>属性或者子属性来监听组件属性更改</p><pre><code class="language-typescript">
const customeText = computed&lt;string&gt;(() =&gt; {
  return props.propValue.base.text
})

</code></pre><h3><a id="hooks_341"></a>hooks</h3><p>还可以通过平台提供的<code>useProp</code>hook来监听属性变化</p><pre><code class="language-typescript">const customeText = ref&lt;string&gt;(props.propValue.base.text)
const propValueChange = (type:string, key:string, value:any) {
  if(type === &#39;base&#39; &amp;&amp; key === &#39;text&#39;){
    customeText.value = value
  }
}
const { propValue } = useProp&lt;StaticTextType&gt;(props.component, propValueChange)

</code></pre><h3><a id="_356"></a>注意事项</h3><p>需要注意的事，只有在编辑模式下才需要监听组件属性变化，在预览模式下不需要监听组件属性变化，因此可以在组件中判断编辑器模式(<code>什么是编辑器模式，详见编辑器模式</code>)，来决定是不是要对属性进行监听依次可以提升组件性能</p><h2><a id="_360"></a>数据</h2><p>组件配置项对象在有一个<code>dataIntegrationMode</code> 数据接入模式的属性，他定义了组件可以从那里接入数据</p><p>接入模式分为三类：</p><blockquote><ul><li><code>SELF</code>: 组件自己内部自行接入数据</li><li><code>UNIVERSAL</code>: 组件采用通用的方式接入数据</li><li><code>GLOBAL</code>: 组件从订阅全局数据</li></ul></blockquote><h3><a id="SELF_370"></a>SELF</h3><p>组件自己在内部通过不管通过<code>HTTP</code>或者<code>WebSocket</code> 自己处理数据的请求和响应,这时候组件的<code>属性栏</code>没有<code>数据</code>配置项</p><pre><code class="language-typescript">
const activeCount = ref&lt;string&gt;(props.propValue.base.count)

const getData = async () =&gt; {
  const resp = await http.get({url: &#39;/getdata&#39;})
  activeCount.value = resp.data
}
const intervalId:number = 0
onMounted( () =&gt; {
  clearInterval(intervalId)
  intervalId = setInterval( getData, 30000)
})

onUnmounted( () =&gt; {
  clearInterval(intervalId)
})


</code></pre><h3><a id="UNIVERSAL_396"></a>UNIVERSAL</h3><p>组件采用<code>useData</code>hook来统一处理数据，通用数据处理方式目前提供了三种数据接入方式，分别是<code>示例数据</code>、<code>静态数据</code>、<code>Rest数据</code></p><blockquote><ul><li><code>示例数据</code>: 示例数据无法更改，主要 用来组件的展示，不建议在生产环境下使用</li><li><code>静态数据</code>: 静态数据从后台数据库中存储的静态数据中加载</li><li><code>Rest数据</code>: 根据用户提供的<code>REST</code>接口，发起HTTP请求，获取数据</li></ul></blockquote><pre><code class="language-typescript">
import { useData } from &#39;@/models/hooks&#39;
let chartData:
  | Array&lt;{ label: string; value: number }&gt;
  | RequestResponse&lt;Array&lt;{ label: string; value: number }&gt;&gt;[&#39;afterData&#39;] = []
const dataChange = (resp: any, _: DataType) =&gt; {
  if (resp.status &gt;= 0) {
    chartData = resp.afterData
    doSomething(chartData)
  }
}

useData(props.component, dataChange)

</code></pre><p><code>useData</code>钩子的第二个参数是一个数据处理回调，入参是获取到的数据，用户可以在回调中根据数据处理组件的渲染</p><h3><a id="GLOBAL_424"></a>GLOBAL</h3><p>待实现</p><h1><a id="_429"></a>监听组件尺寸</h1><p>不管是在<code>画布</code>中<code>拉伸</code>组件还是通过<code>属性栏</code>的<code>样式</code>里面的<code>位置大小</code>属性进行配置，都会引起组件大小变动，可以通过<code>v-resize</code>指令来监听组件大小的更改，具体详见<code>常见指令</code>章节</p><h1><a id="_435"></a>编辑器模式</h1><ol><li>模式分类</li></ol><p>编辑器分为<code>编辑模式(EDIT)</code>、<code>预览模式(PREVIEW)</code>、<code>视图模式(VIEW)</code></p><ol start="2"><li>模式作用</li></ol><p>在组件中可以根据编辑器的模式来切换不同的表现形式，例如：</p><blockquote><ul><li>在<code>编辑模式</code>下我们需要监听组件属性或者样式的变化，但是在<code>预览模式</code>和<code>视图模式</code>下我们不需要监听组件属性的变化,这时候我们可以获取编辑器模式，来在不同模式下采用不同的逻辑。</li></ul></blockquote><blockquote><ul><li>在<code>编辑模式</code>下我们采用示例数据来渲染组件，但是在<code>预览模式</code>和<code>视图模式</code>下我们采用生产数据渲染组件。</li></ul></blockquote><ol start="3"><li>获取组件模式</li></ol><p>我们可以通过<code>canvasState</code>来获取编辑器模式,例如</p><pre><code class="language-typescript">import useCanvasState from  &#39;@/designer/state/canvas&#39;

const canvasState = useCanvasState()
// editoMode 即为编辑器模式
canvasState.editMode

// isEditMode 可以判断编辑器是否处于编辑模式
canvasState.isEditMode

</code></pre><h1><a id="_469"></a>常用指令</h1><p><code>v-resize</code> 组件缩放</p><p>组件编辑器中经常需要被拉伸进行放大或者缩小，可以采用我们封装的<code>v-resize</code>指令,来监听组件的大小变化，以便做出对应的响应</p><pre><code class="language-html">&lt;div v-size=&quot;resizeHander&quot;&gt;我是组件&lt;/div&gt;
</code></pre><pre><code class="language-TypeScript">const resizeHandler = (entry: ResizeObserverEntry) =&gt; {
  const {width, height}: DOMRectReadOnly = entry.contentRect
  doSomething()
}
</code></pre><h1><a id="_486"></a>组件文档</h1><p>本项目主体文档采用<code>Markdown</code>编写，支持在Markdown中渲染Vue组件，为了方便文档书写，我们提供了一个工具组件<code>RenderComponent</code>,支持渲染任意组件，并提供<code>palyground</code></p><pre><code class="language-vue">&lt;RenderComponent
  :config=&quot;StaticTextComponent&quot;
  :component=&quot;StaticText&quot;
  :prop-value=&quot;{
    base: {
      text: &#39;我们一起建设OpenDataV吧&#39;,
      type: &#39;text&#39;
    }
}&quot;
  :style=&quot;{
  color: &#39;#d03050&#39;,
  fontSize: 40,
  fontWeight: 800,
  width: 550,
  height: 100
}
&quot;
  title=&quot;静态文本&quot;
  mode=&quot;debug&quot;
/&gt;
</code></pre><blockquote><ul><li><code>mode</code>: 模式，可选项<code>debug</code>|<code>view</code>, 在<code>debug</code>下提供了<code>playground</code>功能</li><li><code>component</code>: 组件模板</li><li><code>config</code>:组件配置项类</li><li><code>propValue</code>:组件属性初始化配置项</li><li><code>style</code>:组件样式初始化配置项</li></ul></blockquote><p>大家在撰写组件文档时需要有如下内容</p><p><strong>1. 属性或者样式的解释</strong></p><p><strong>2. 效果示例</strong></p><p><strong>3. 可交互的<code>playground</code></strong></p>`,124),i=[a],m={__name:"Development",setup(r,{expose:e}){return e({frontmatter:{}}),(p,s)=>(t(),d("div",l,i))}};export{m as default};
