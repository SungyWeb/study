# 重修es6

主要用于记录以前不知道/不清楚的知识点

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