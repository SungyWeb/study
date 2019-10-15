# django快速入门内容整理，方便知道需求去哪里查

## 第一节：请求和相应

+ 启动服务和端口
	```
	python manage.py runserver
	python manage.py runserver 8080
	```
+ 创建应用
	```
	python manage.py startapp xxx
	```
+ 编写视图/路由（接口/响应）

## 第二节：数据库配置
> xxx 代表某个应用

+ 项目的setting.py中`DATABASES`字段
+ 创建一张表 `python manage.py migrate`
+ 定义字段语法(应用中的'models.py'中)，也可以定义方法，方便操作调用
+ 将修改的部分做一次迁移(备份？)，它被储存在 polls/migrations/0001_initial.py 里(每次都是存在这个文件里还是0001是操作的编号，会自增？)，在控制台输出结果 `python manage.py makemigrations xxx`
+ sqlmigrate 接到一个迁移名称，返回对应的sql，这个命令没有同步到数据库，只是让你看看django准备做什么 `python manage.py sqlmigrate polls 0001`
+ 将迁移数据同步到数据库 `python manage.py mrgrate` 
+ 即需要散步
	1. 编辑models.py文件
	2. 运行`python manage.py makemigrations`为模型的改变生成迁移文件
	3. 运行`python manage.py migrate`来应用数据库迁移
+ 获取数据库数据api（原文段落：初试api）
+ django应用管理界面

## 第三节：视图模板

+ 视图模板，返回html
+ 404错误信息
+ 模板中url优化
+ 为url添加命名空间

## 第四节：表单处理

+ 视图模板
	1. 模板语法
	2. request.POST['key']
	3. KeyError 上面的key如果没有提供会引发KeyError
	4. HttpResponseRedirect 路由重定向	
+ 改良URLconf
+ 改良视图

## 第五节：自动化测试
## 第六届：静态文件
## 第七届：后台管理

