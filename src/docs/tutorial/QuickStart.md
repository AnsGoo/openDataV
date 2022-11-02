[toc](目录)


  快速创建一个属于自己的页面并发布

# 快速开始

接下来我们将带领大家创建一个页面，来熟悉该低代码平台的使用

## 访问布局管理

```shell
/Pages
```

![管理页面](./img/005.png)

当前会展示出项目已有的页面，你可以点击页面卡片进行查看，也可以对已有页面进行二次编辑，还可以自己新创建一个页面


## 打开创建页面


点击`新建按钮`号会自动进入`创建`页面

![create](./img/006.png)

整个页面被分为：

- 顶部的`工具栏`：  常用工具按钮
- 左侧的`资源栏`：  组件和图层
- 右侧的`属性栏`：  属性分为组件属性和画布属性
- 底部的`状态栏`：  创建页面的状态
- 中间的`画布`：    承载组件的最顶层容器

接下来我们将开始创建一个页面

                                      
# 添加第一组件

我们设计一个`HelloWord`文本页面

## 拖动组件

我们在左侧`资源栏`的组件中找到`柱状图`->`基础柱状图`组件，并将其拖动到画布中央，并单击鼠标左键选中组件

![text](./img/007.png)

## 修改组件属性


修改组件下列属性
- 数据配置的大值为`70`
- 坐标轴配置的X网格线`不显示`
- 坐标轴配置的轴线颜色为 `#18A058`

![text](./img/008.png)

同时我们可以对组件进行`拖动`、`旋转`、`拉伸`

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/010.mp4" type="video/mp4" />
</video>

## 配置组件数据

将组件的示例数据改为静态数据，切换组件数据类型，这里我们选择静态数据,并选择具体的静态数据

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/011.mp4" type="video/mp4" />
</video>


## 修改组件样式

所有的组件都有`位置大小`的公共样式，主要是用来设置组件的`坐标`、`尺寸`和`旋转`情况，你除过可以通过`拉伸`、`拖动`、`旋转`组件本身来改变这些值以外，还可以通过公共样式`位置大小`来精确更改。
这里我让将组件旋转状态改为0

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/012.mp4" type="video/mp4" />
</video>

# 组件间的操作

我们向画布中追加一个边框组件

![imag](./img/014.png)

## 选中

这里我们通过框选，选中`边框`和`柱状图`

- 框选

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/020.mp4" type="video/mp4" />
</video>

- ctr + '鼠标单击'

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/021.mp4" type="video/mp4" />
</video>

- 通过图层选中

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/022.mp4" type="video/mp4" />
</video>

## 组合

在选中框上右击组合进行组件的组合，这时候两个或者多个组件就被变成一个`分组`组件

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/023.mp4" type="video/mp4" />
</video>



## 拆分

我们也可以通过选中分组组件，然后鼠标右击对`分组`组件进行`拆分`

<video muted autoplay="autoplay" loop="loop">
	<source src="./img/024.mp4" type="video/mp4" />
</video>



## 更改图层顺序

图层顺序是页面表现中重要的因素，我们可以通过`上移`、`下移`、`置顶`、`置顶来改变组件的图层顺序，组件的图层顺序越高，组件越靠近顶部，顶部组件可以遮挡底部组件




# 预览并发布

完成页面的设计，我们尝试预览一下效果，如果满意我们可以发布

## 预览

点击设计器的预览按钮，则会打开有一个新的页面展示你我们的设计效果
并按下`F11`键，可在全屏下展示


## 发布

也可以点击发布按钮，将设计页面进行发布，与预览不同的是，发布需要输入页面名称，并且会将页面数据存入数据库






