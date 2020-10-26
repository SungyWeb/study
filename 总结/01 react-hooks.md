# 1 why hooks

## 1.1 react设计理念

react认为UI视图是数据的一种视觉映射，即`UI = F(data)`, F是组件，data包括外部传入的props和自身的state
。

数据分为可变的和不可变的。一般不可变的数据称之为数据，可变的数据称之为**状态**。

状态可以通过**行为**和**作用**进行改变。

行为指的是用户交互行为，如点击事件等。

作用指的是一些没有用户参与却引起了状态的变化，这是程序内部的一些用户不知道的逻辑，如ajax请求、console.log等。

## 1.2 class Component困局

### 1.2.1 组件复用困局

组件化开发一般必须满足两个条件，一是数据共享（即组件之间的数据交互），二是组件复用

对于数据共享，react采用单向数据流管理；对于有状态组件的复用，早期使用CreateClass + Mixins，在使用Class Component取代CreateClass之后又设计了Render Props和Higher Order Component，直到再后来的Function Component+ Hooks设计，React团队对于组件复用的探索一直没有停止

HOC（高阶组件）：
+ 嵌套地狱，每一次HOC都会产生一个组件实例
+ 可以使用装饰器来缓解嵌套带来的可维护性问题，但本质还是HOC，而且易读性差
+ 嵌套层级太多，可能会引起props的覆盖问题

Render Props：
+ 数据流向更加直观，子孙组件可以明确的看到数据来源
+ 丢失了组件上下文，因此没有`this.props`属性

### 1.2.2 javascript Class 设计缺陷

1. class组件this指向问题
```js
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'home',
		}
	}
	clickHandle() {
		// 报错
		console.log(this.state.name)
	}
	render() {
		return (
			<button onClick={ this.clickHandle }>click</button>
		)
	}
}
```
react的class组件，需要在constructor中`this.clickHandle.bind(this)`或者声明clickHandle时，使用箭头函数`clickHandle = () => {  }`

**为什么会丢失this？丢失后，this是什么？**

因为react在创建虚拟dom时，会将`onClick`属性挂载在`button`元素的`onclick`上，即
```js
var ele = document.createElement('button')
ele.onclick = function() {		// class组件中的clcikHandle方法
	console.log(this.state.name)		// 注意⚠️：click执行后，this指向的是button
}
```
所以this丢失后，指向的不是undefined或者window，而是被绑定的元素自身，即原生js中的dom元素对象

2. 编译后的size问题

+ Class Component在React内部是当做Javascript Function类来处理的，这样会导致编译代码多了很多
+ Function Component编译后就是一个普通的function，function对js引擎是友好的

3. Function Component 设计之初

Function Component设计之初是作为无状态组件使用，用于简化只有render的class组件的写法（不是所有的组件都需要生命周期）。

+ Function Component是纯函数，利于组件复用和测试
+ Function Component自身没有状态，依赖外部传入的props、eventHandle来返回jsx，所有它不能脱离class Component存在

# react hooks

为了解决Function Component的状态问题，react hooks应运而生。

> 什么是hooks？
> Function Component在组件首次render之后，组件自身能够通过某种机制再次出发状态的变化并引起re-render，这种机制就是hooks


1. useState为啥不返回object而是返回tuple？

2. 为什么只能在Function Component里调用Hooks API？

3. 为什么必须在函数组件顶部作用域调用Hooks API？

4. useState hook如何更新数据？

5. 

# hooks 存在的问题

1. hooks解决了组件功能复用、逻辑复用，但是没有解决jsx复用，与dom还是存在一定的耦合度
2. hooks模糊了或者说抛弃了生命周期的概念，带来更高的学习门槛
3. 类比函数拥有更丰富的表达能力，试想一个挂载了十几个方法或属性的Class Component，用Function Component来写如何组织代码使得逻辑清晰

















































