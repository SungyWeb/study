# 1. 水平垂直居中五种方案

这种需求在之前的项目中是非常常见的，开始的时候只用了xx，后来css3兴起，flex布局，偶然间看知乎的时候发现这种方案虽然不常用，但是挺好玩的（但是挺不错的）

> 1. 体现了实际项目经验
> 2. 说明平时关注领域知识

1.  定位： 三种

	+ 定宽高,  使用margin调整
	
	```css
		.box { position: relative; }
		.inner { 
			width: 100px;
			height: 50px;
			position: absolute;  
			top: 50%;
			left: 50%;
			margin-top: -25px;
			margin-left: -50px;
		}
	```
	
	+ 定宽高，但不需要考虑,过度方案，一般不用

	```css
		.box { position: relative; }
		.inner { 
			width: 100px;
			height: 50px;
			position: absolute;  
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
	```

	+ 不定宽高，使用transform:translate ，兼容性问题

	```css
		.box { position: relative; }
		.inner { 
			width: 100px;
			height: 50px;
			position: absolute;  
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);	// 相对于自身的50%
		}
	```	
2. display: flex

	```css
	.box {
		display: flex;
		align-item: center;
		justify-content: center;
	}
	```
3. javascript 

	```js
	// getBoundingClientRect() 返回的是元素边界距离视口的top-left
	// getClientRects() 返回的是ClientRect的集合
	box.style.position = 'absolute'
	var left = (box.offsetWidth - inner.offsetWidth)/2
	var top = (box.offsetHeight- inner.offsetHeight)/2
	```
4. display: table-cell

	```css
	.box {
		display: table-cell;
		vertical-align: center;
		text-align: center;
		// 宽高不能是百分比,必须是固定px宽高
	}
	.inner { display: inline; }
	```

# 2. css盒模型

我认为有四种盒模型：标准盒模型、怪异盒模型（IE盒模型）、flex弹性伸缩盒模型、columns多列布局

1. 标准盒模型

	盒子的宽度 为内容的宽度，width = content; 即 box-sizing: content-box; **但是这种方式并不常用，比如盒子大小50x50，但需要加padding的时候，盒子就会变大，所以还要改width**

2. 怪异盒模型

	盒子的宽度为内容+填充+边框， width=content+ padding+border; css3 推出 box-sizing: border-box;可以让我们使用怪异盒模型。**这种方式在修改padding、border大小时，浏览器会自动修改content的宽度，盒子的大小始终保持不变。包括我用过的bootstrap、element-ui、ant-design，基本都是用的这种方式。**

3. flex布局

	flex是flexible box的缩写，意思是“弹性布局”。**flex布局是现在非常常用的布局方式，尤其是水平方向布局时，抛弃了传统的display+position+float布局方式，而且提供便利的垂直方案，所以一般我在布局时，也在使用flex布局**

	> 设为flex布局后，子元素的float、clear、vertical-aligin属性将会失效。

	容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

	项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

	+ 容器的属性
		+ flex-direction 控制主轴的方向，值为 
			+ row 默认值，主轴水平方向，起点在左端
			+ row-reverse 主轴水平方向，起点在右侧
			+ column 主轴垂直方向，起点在上沿
			+ column-reverse 主轴垂直方向，起点在下沿
		+ flex-wrap 如果一行放不下，如何换行
			+ nowrap 默认值，不换行
			+ wrap 换行，第一行在上面，向下换行
			+ wrap-reverse 换行，第一行在下面，向上换行
		+ flex-flow 这是flex-direction和flex-wrap的简写 `flex-flow: <flex-direction> <flex-wrap>`
		+ justify-content 定义了项目中主轴方向的对齐方式，其值为（假设主轴从左到右）
			+ start 左对齐
			+ end 右对齐
			+ center 居中
			+ space-between 两端对齐，项目之间距离相等
			+ space-around 每个项目两侧的距离相等
		+ align-items 定义项目中交叉轴上如何对齐，其值为（假设交叉轴从上到下）
			+ flex-start 交叉轴起点对齐
			+ flex-end 交叉轴终点对齐
			+ center 交叉轴居中对齐
			+ baseline 项目的第一行文字的基线对齐
			+ stretch 默认值，如果项目没有设置高度或为aotu，则占满整个容器
		+ align-content 定义多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
	+ 项目的属性
		+ order 定义项目的排列顺序，数值越小，排列越靠前，默认为0
		+ flex-grow 项目的放大比例，默认为0，即存在剩余空间，也不放大
		+ flex-shrink 项目的缩小比例，默认为1，如果空间不足，该项目缩小，如果为0，其他为1时，那么空间缩小时，为0的不会缩小；负值无效。
		+ flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小;也可以设为固定的数值，则项目将占据固定空间。
		+ flex 这是flex-grow、flex-shrink、flex-basis 三个属性的缩写，默认值为`flex: 0 1 auto`。它有两个快捷值auto(1 1 auto) 和 none(0 0 auto)
		+ align-self 允许单个项目与其他项目的对齐方式不一样，可覆盖align-items属性，取值与align-items一样

4. column 多列布局

	多列布局声明提供了一种多列组织内容的方式，正如你在一些报纸中看到的那样。将一个盒子分成多列，还能上下衔接。
	
5. Grid网格布局
	
	Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。




