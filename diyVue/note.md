# Vue
	1. $options: 保存了创建实例时的对象参数
	2. _data: 保存了创建$options.data对象
	3. _proxy(): 数据代理，通过vm.xx来访问vm._data.xx
	4. obserer(): 数据劫持
	5. $compile(): 编译解析el中的html