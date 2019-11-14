# 重修es6

主要用于记录以前不知道/不清楚的知识点 参考[阮一峰](http://es6.ruanyifeng.com)

1. var let const
	+ typeof 一个未声明的变量不会报错，返回字符串'undefined'
	+ 可以使用块级作用域{}代替自执行函数
	+ let const 不会变量提升
	+ var声明的变量挂在到window，let/const不会挂在到window
2. 解构赋值
	+ 默认值必须是严格等于undefined
		```
		let [a = 1] = [undefined];	// a -> 1
		let [a = 1] = [null];	// a -> null
		let {a = 1} = {a: undefined};	// a -> 1
		let {a = 1} = {a: null};	// a -> null
		```
	+ 数组的本质是对象，使用对象形式对数组解构
		```
		let arr = [1,2,3,4,5,6];
		let {0: first, [arr.length - 1]: last} = arr;
		// first -> 1
		// last -> 6
		```
	+ 字符串是一个类数组对象，可以被解构，而且可以将length属性解构
		```
		const [a,b] = 'hello';
		// a -> h
		// b -> e
		let {length: len} = 'hello';
		// len -> 5
		```
	+ 解构时，如果等号右边是数组或布尔值，会先转成对象
		```
		let { toString: s } = 123;	// s -> Number.prototype.toString
		let { toString: s } = true;	// s -> Boolean.prototype.toString
		```
	+ 由于null和undefined无法转成对象，所以无法解构，null和undefined上没有任何属性
	+ 函数参数解构赋值
3. 字符串
	+ 字符串可以被for of 遍历
	+ 串模板字符如果紧跟在函数名后面，该函数将被调用来处理这个模板字符串
	```
	alert`123`;		// 等价于alert(123)
	// 如果模板字符串含有变量，清空比较复杂，参考http://es6.ruanyifeng.com/#docs/string 模板标签部分
	```
	+ 新方法 includes startWith endWith 
4. 数值
	+ Math.trunc 去除小数部分，返回整数，参数不是数值先转成数值，对于空值和无法取整的返回NaN
5. 函数
	+ 参数默认值
	+ 箭头函数
		1. this指向，不能通过bind改变this
		2. 不能用于原型的构造函数即不能new一个箭头函数
		3. 不能用arguments对象，可以用(...rest)
		4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数
6. 数组
	+ 将字符串转换成数组可以split，还可以
		```
		const arr = [...'hello'];	// arr = ['h', 'e', 'l', 'l', 'o'];
		const arr = Array.from('hello');
		```
	+ Array.of 将一组值转化为数组,参数为空，返回空数组
		```
		Array.of(1,2,3);	// [1,2,3]
		```
	+ 可以用for of 遍历数组
	+ forEach遍历数组时，不可以退出循环，可以用every或some代替
7. 对象
	+ 遍历
		- for in 遍历对象自身和继承的可枚举属性
		- Object.keys() 返回数组，包括对象自身的（不包含继承的）所有可枚举属性（不包含Symbol属性）的键名
		- Object.getOwnPropertyNames() 返回数组，包括对象自身的所有属性（不包含Symbol属性，但是包括不可枚举属性）的键名
		- Object.getOwnPropertySymbols() 返回一个数组，包含对象自身的所有Symbol属性的键名
		- Reflect.ownKeys() 返回一个数组，包含对象自身的所有键名，包括Symbol和不可枚举
	+ Object.is() 行为与===基本一致，不同的是
		```javascript
		+0 === -0 // true
		NaN === NaN // false
		Object.is(+0, -0)	// false
		Object.is(NaN, NaN)		// true
		```
	+ Object.assign() 只拷贝对象的自身属性（包括symbol属性，但不拷贝继承属性和不可枚举属性），注意点
		- 浅拷贝，如果源对象的某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
			```
			const obj1 = {a: {b: 1}};
			const obj2 = Object.assign({}, obj1);
			obj1.a.b = 2;
			obj2.a.b // 2
			```
		- 同名属性替换
			```
			const target = { a: { b: 'c', d: 'e' } }
			const source = { a: { b: 'hello' } }
			Object.assign(target, source)
			// { a: { b: 'hello' } }
			```
		- 数组处理
			```
			Object.assign([1, 2, 3], [4, 5])
			// [4, 5, 3]
			```
	+ Object.getOwnPropertyDescriptors() 返回对象所有自身属性（非继承属性）的描述
	+ Object.setPrototypeOf() 设置原型对象的属性
		```
		const proto = {
			x: 1, 
			y: 2
		}
		const obj = {
			z: 3
		}
		Object.setPrototypeOf(obj, proto);
		// obj.x => 1; obj.y => 2; obj.z => 3;
		proto.a = 4;
		// obj.a => 4;
		```
	+ Object.getPrototypeOf() 读取一个对象的原型对象，等同于 obj.__proto__
	+ Object.keys() 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名
	+ Object.values() 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值，Object.values会过滤属性名为 Symbol 值的属性
	+ Object.entries() 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组，如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
		```
		const obj = { foo: 'bar', baz: 42 };
		Object.entries(obj)
		// [ ["foo", "bar"], ["baz", 42] ]
		```
	+ Object.fromEntries() 是Object.entries()的逆操作，用于将一个键值对数组转为对象。
		```
		Object.fromEntries([
		  ['foo', 'bar'],
		  ['baz', 42]
		])
		// { foo: "bar", baz: 42 }
		```

8. Symbol
	+ 定义：为了解决对象属性名都是字符串而产生冲突，保证每个属性的名字都是独一无二的。Symbo是一个原始数据类型，不能使用`new Symbole()`，因为它是一个原始类型的**值**，不是对象，所以不能添加属性，基本上，它就是一个类似字符串的数据类型。
	+ 使用`Symbol()`创建（不要用new），可以接收一个字符串参数，主要是为了区分。
		```
		let s1 = Symbol('foo');
		let s2 = Symbol('bar');
		s1 // Symbol(foo)
		s2 // Symbol(bar)
		s1.toString() // "Symbol(foo)"
		s2.toString() // "Symbol(bar)"
		```
	+ 不可以隐式转换成字符串，但可以通过toString/String
		```
		const s = Symbol('name');
		s.toString();	// -> Symbol(name)
		String(s);	// Symbol(name)
		```
	+ 可以显示/隐式转成布尔值
		```
		const s = Symbol();
		Boolean(s);		// -> true
		!s;		// false
		```
	+ 不可以显示/隐式转换成数字
	+ 作为对象属性，定义和调用时都必须用中括号，且不加引号
		```
		const s = Symbol('name');
		const f1 = Symbol('fn1');
		const f2 = Symbol('fn2');
		let o = {
			[s]: 1,
			[f1]: function(){},
			[f2]: function(){},
			s: 11,
			f1: 22,
			f2:33
		};
		// o.s -> 11; o.f1 -> 22; o.f2 -> 33; o[s] -> 1; o[f1] -> fn; o[f2] -> fn
		const a = Symbol('a');
		o[a] = 'a';
		// o[a] -> a;
		```
	+ Symbol 作为属性名，可以作为非常私有的内部属性名。遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但可以通过Object.getOwnPropertySymbols()方法获取所有symbol属性名的数组; Reflect.ownKeys() 返回所有类型的键名的数组，包括常规键名和 Symbol 键名。
	+ Symbol.for() 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其**注册(登记)**到当前作用域。
		```
		Symbol.for("bar") === Symbol.for("bar")
		// true
		Symbol("bar") === Symbol("bar")
		// false
		Symbol('bar') === Symbol.for('bar')
		// false 因为Symbol('bar')没有登记，所以Symbol.for找不到，返回的是新的Symbol
		```

		```
		function foo() {
		  return Symbol.for('bar');
		}
		const x = foo();
		const y = Symbol.for('bar');
		console.log(x === y); // true
		// Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值
		```
	+ Symbol.keyFor() 返回一个已**登记**的Symbol类型值得key
		```
		let s1 = Symbol.for("foo");
		Symbol.keyFor(s1) // "foo"

		let s2 = Symbol("foo");
		Symbol.keyFor(s2) // undefined 因为Symbol()创建的是不会登记的
		```
9. set
	+ 定义：类似于数组，但是它成员的值没有重复的，使用构造函数 new Set()，可接收一个数组或具有iterable（可迭代的） 接口的其他数据结构作为参数，可以用来去重（两个NaN也只会保留一个）。
	+ 属性方法
		- size 返回实例的成员总数
		- add() 添加某个值，返回Set结构本身
		- delete() 删除某个值，返回布尔值，表示删除是否成功
		- has() 返回布尔值，表示是否为Set成员
		- clear() 清除所有成员，没有返回值
	+ 遍历方法
		- keys()/values()/enteries()

			keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

			```
			let set = new Set(['red', 'green', 'blue']);

			for (let item of set.keys()) {
			  console.log(item);
			}
			// red
			// green
			// blue

			for (let item of set.values()) {
			  console.log(item);
			}
			// red
			// green
			// blue

			for (let item of set.entries()) {
			  console.log(item);
			}
			// ["red", "red"]
			// ["green", "green"]
			// ["blue", "blue"]
			```
		- forEach()
			```
			let set = new Set([1, 4, 9]);
			set.forEach((value, key) => console.log(key + ' : ' + value))
			// 1 : 1
			// 4 : 4
			// 9 : 9
			// 依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。
			```
10. map
	+ 定义： Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现
		```
		const m = new Map();
		const o = {p: 'Hello World'};

		m.set(o, 'content')
		m.get(o) // "content"

		m.has(o) // true
		m.delete(o) // true
		m.has(o) // false

		// 注意，get和set的数组不是同一个数组的引用，所以是undefined
		const map = new Map();

		map.set(['a'], 555);
		map.get(['a']) // undefined
		```
	+ 属性方法
		- size 
		- set(key, value)
		- get(key)
		- has(key)
		- delete(key)
		- clear()
	+ 遍历
		- keys()
		- values()
		- enteries()
		- forEach

11. proxy
	+ 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
	+ 基本用法，使用new Proxy(target, handle) handle是一个对象	
		```
		var proxy = new Proxy({}, {
		  get: function(target, property) {
		    return 35;
		  }
		});
		let obj = Object.create(proxy);
		obj.time // 35
		```
	+ hanle对象可包含的属性（即proxy可拦截的操作）
		- get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
		-set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
		- has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
		- deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
		- ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
		- getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
		- defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
		- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
		- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
		- isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
		- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
		- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
		- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)

12. Reflect 
	+ 概述

		Reflect 对象于proxy对象一样，为了增加对象操作而提供的新API，它的设计目的有以下几点:

		(1) 将Object对象的一些明显属于语言内部的方法（如Object.definedProperty)，放到Reflect对象上。

		(2) 修改某些Object方法返回的结果，如`Object.definedProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.definedProperty(obj, name, desc)`则会返回false

		(3) 让Object操作都变成函数行为。某些object操作是命令式的，如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让他们变成了函数行为。

		(4) Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

	+ 静态方法, 与proxy一致
		Reflect.apply(target, thisArg, args)
		Reflect.construct(target, args)
		Reflect.get(target, name, receiver)
		Reflect.set(target, name, value, receiver)
		Reflect.defineProperty(target, name, desc)
		Reflect.deleteProperty(target, name)
		Reflect.has(target, name)
		Reflect.ownKeys(target)
		Reflect.isExtensible(target)
		Reflect.preventExtensions(target)
		Reflect.getOwnPropertyDescriptor(target, name)
		Reflect.getPrototypeOf(target)
		Reflect.setPrototypeOf(target, prototype)


13. Promise
	+ 含义：Promise是一个异步编程的解决方案，它是一个容器，里面保存着未来才会结束的事件。它有三种状态pending/fulfilled/rejected，它的状态变化不受外界影响，只有异步操作的结果可以决定当前是哪一种状态；另外一旦状态改变了，就不会再改变，只能是从pending->fulfilled或者pending->rejected这两种变化，一旦发生了变化，会一直保持这个结果，这时成为resolved(已定型)。
	+ 缺点： 无法取消promise，**一旦创建就会立即执行（new Promise中会立即执行）**，无法中途取消；如果不设置回调函数，promise内部抛出错误，不会反应到外部；当处于pending状态，无法得知目前是哪一阶段（刚刚开始还是即将完成）
		```
		let promise = new Promise(function(resolve, reject) {
		  console.log('Promise');
		  resolve();
		});
		promise.then(function() {
		  console.log('resolved.');
		});
		console.log('Hi!');
		// Promise
		// Hi!
		// resolved
		```
	+ Promise.prototype.then() 接收两个回调函数，第一个是resolved状态的回调函数，第二个是rejected状态的回调函数（可选）。then方法会返回一个**新的**promise，所以可以采用链式写法
		```
		getJSON("/posts.json").then(function(json) {
		  return json.post;
		}).then(function(post) {
		  // ...
		});
		// 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
		```
	+ Promise.prototype.catch() 它是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定放生错误时的回调函数。
	+ 一般情况不在then中指定rejected的回调，而是使用catch来获取错误
	+ Promise.prototype.finally() 不管promise对象最终状态如何，都会执行的回调
	+ Promise.all() 接收一个promise实例的数组，包装成一个新的promise对象，只有数组的每个promise都fulfilled，才会进入fulfilled，只要其中一个rejected，就会进入rejected，并返回第一个rejected的值。
	+ Promise.race() 接收一个promise实例的数组，包装成一个新的promise对象，只要有一个实例的状态改变，新的promise对象的状态也会随之改变
	+ Promise.allSettled() 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束，，一旦结束，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入Promise.allSettled()的 Promise 实例。
		```
		const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
		const results = await Promise.allSettled(promises);
		// 过滤出成功的请求
		const successfulPromises = results.filter(p => p.status === 'fulfilled');
		// 过滤出失败的请求，并输出原因
		const errors = results
		  .filter(p => p.status === 'rejected')
		  .map(p => p.reason);
		```
	+ Promise.any() 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。该方法目前是一个第三阶段的提案 
	+ Promise.resolve() 将现有对象转为 Promise 对象
		```
		Promise.resolve('foo')
		// 等价于
		new Promise(resolve => resolve('foo'))
		```
		1. 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
		2. 参数是一个thenable对象(具有then方法的对象)，Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法
		3. 参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
		4. Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
	+ Promise.reject(reason) 方法也会返回一个新的 Promise 实例，该实例的状态为rejected

14. Iterator(遍历器)和for...of 

	可用于Array/Map/Set/String/TypedArray/函数的 arguments 对象/NodeList 对象

15. Generator
	+ 定义：Generator函数通过yield来定义不同的状态，每次可以通过next方法返回该状态表达式的值。
		```
		function* helloWorldGenerator() {
		  yield 'hello';
		  yield 'world';
		  return 'ending';
		}
		var hw = helloWorldGenerator();
		hw.next()
		// { value: 'hello', done: false }
		hw.next()
		// { value: 'world', done: false }
		hw.next()
		// { value: 'ending', done: true }
		hw.next()
		// { value: undefined, done: true }
		```
	+ yield 的返回值总是undefined，next方法可以带一个参数，该参数被作为上一个yield表达式的返回值。
		```
		function* foo(x) {
		  var y = 2 * (yield (x + 1));
		  var z = yield (y / 3);
		  return (x + y + z);
		}
		var a = foo(5);
		a.next() // Object{value:6, done:false}
		a.next() // Object{value:NaN, done:false}
		a.next() // Object{value:NaN, done:true}
		var b = foo(5);
		b.next() // { value:6, done:false }
		b.next(12) // { value:8, done:false }
		b.next(13) // { value:42, done:true }
		```
16. async
	+ async/await 是 Generator 函数的语法糖，重要的一点是 async 返回的是一个promise，会将函数return的值作为resolve的值
		```
		async function getStockPriceByName(name) {
		  const symbol = await getStockSymbol(name);
		  const stockPrice = await getStockPrice(symbol);
		  return stockPrice;
		}
		getStockPriceByName('goog').then(function (result) {
		  console.log(result);
		});
		```
	+ 注意点
		1. 前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中
			```
			async function myFunction() {
			  try {
			    await somethingThatReturnsAPromise();
			  } catch (err) {
			    console.log(err);
			  }
			}
			// 另一种写法
			async function myFunction() {
			  await somethingThatReturnsAPromise()
			  .catch(function (err) {
			    console.log(err);
			  });
			}
			```
		2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
			```
			// bad
			let foo = await getFoo();
			let bar = await getBar();
			// good 写法一
			let [foo, bar] = await Promise.all([getFoo(), getBar()]);
			// good 写法二
			let fooPromise = getFoo();
			let barPromise = getBar();
			let foo = await fooPromise;
			let bar = await barPromise;
			```
		3. await命令只能用在async函数之中，如果用在普通函数，就会报错。
	+ 实战：请求一组url
		```
		// 这样写并不好，因为这是继发，只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间
		async function logInOrder(urls) {
		  for (const url of urls) {
		    const response = await fetch(url);
		    console.log(await response.text());
		  }
		}
		```

		```
		// TODO 不是很理解
		// 虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。
		async function logInOrder(urls) {
		  // 并发读取远程URL
		  const textPromises = urls.map(async url => {
		    const response = await fetch(url);
		    return response.text();
		  });

		  // 按次序输出
		  for (const textPromise of textPromises) {
		    console.log(await textPromise);
		  }
		}
		```
