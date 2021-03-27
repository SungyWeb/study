[TOC]

# 1. react为什么不用`requestIdleCallback`而是自行开发？即`requestIdleCallback`有什么缺点？

+ 浏览器兼容问题
+ 触发频率不稳定，受很多因素影响，比如当我们切换浏览器tab时，之前tab注册的`requestIdleCallback`触发频率会变得很低

# 2. useEffect第一个参数为什么不能用异步函数？

```react
useEffect(async () => {
  const res = await getUserInfo()
  setUserInfo(res.data)
}, [])
```

因为函数一旦被`async`标记，那么这个函数执行后返回的就是`Promise`

而react要求`useEffect`第一个参数的返回值必须是一个`cleanup function`或者没有返回值

<font color="red">todo: why?</font>

# 3. react三大核心

+ Scheduler 调度器--调度任务的优先级，高优任务优先进入**Reconciler**
+ Reconciler 协调器--负责找出变化的组件
+ Renderer 渲染器--负责将变化的组件渲染到页面上



# 4. react的核心在于能够中断当前任务，转而执行高优任务，完毕再继续执行之前的任务，那么为什么不用`Generator`来实现的呢？

+ 类似`async`，`Generator`也是`传染性`的，使用了`Generator`则上下文的其他函数也需要作出改变
+ `Generator`执行时的”中间状态“是有上下文关联的。
  + [代数效应与generator](https://react.iamkasong.com/process/fiber-mental.html#代数效应与generator)
  + [issus](https://github.com/facebook/react/issues/7942#issuecomment-254987818

# 5 ReactElement 是什么？有什么作用？

ReactElement 实际上只是一种数据结构，一个对象，里面保存了一些react的必要信息，**react通过这些信息来脱离平台的限制**

```js
function createElement(type, config, children) {
	//  将ref和key从config中拿出来
  // 将chiren放入到props中
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}
function ReactElement(type, key, ref, self, source, owner, props) {
  var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
  };
  // ...
  return element
}
```

+ type 表示节点类型，用于判断如何创建节点
+ Key 和 ref 特殊处理
+ $$typeof 用于确定是否属于ReactElement











# todo

+ async generator 需要上下文？ 即调用async的函数 也需要async吗