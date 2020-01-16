# 管理员身份运行cmd到mysql的bin下

## 初始化数据库
+ `mysqld --initialize --console` 生成默认root用户和初始密码
+ `mysqld install`
+ `net start mysql` 启动mysql服务
+ `net stop mysql` 关闭mysql服务
+ `mysql -h 主机名 -u 用户名 -p` -h可以登录远程服务器的数据库，登录本机可以省略，即`mysql -u root -p`
+  R.2OZodEYjg*
+ 提示'Enter password',输入刚才生成的密码
+ 修改密码 `ALTER user 'root'@'localhost' IDENTIFIED BY 'Sun@123` 密码必须包含大小写字母、数字、特殊符号
+ 配置环境变量
## 操作
+ show databases;
	+ information_schema 数据库对象信息，如用户表信息、列信息、字符、分区等
	+ performance_schema 存储数据库服务性能参数
	+ mysql 存储数据库用户授权信息
	+ sys 5.7版本后才有，降低对象信息和性能参数的查询复杂度，视图化，能够快速获取谁用了多少次元，有谁链接过
+ create database test1 character set utf8;
+ drop database test1;
+ use test1;
+ show tables;
+ show variables like 'char%';	查看字符编码
+ 配置字符编码， mysql的安装目录创建或修改`my.ini`中的对应字段，需要重启mysql服务才能生效。
		```
		[client]
		default-character-set=utf8

		[mysql]
		default-character-set=utf8

		[mysqld]
		character-set-server=utf8
		```
+ create/alter/drop 数据定义语句， 用来操作数据库对象：库、表、列等
	+ alter table 表名 add 字段 int(11);	新增字段
	+ alter table 表名 modify age char(1);	修改字段类型
	+ alter table 表名 change age sex char(1); 	修改字段名称和类型
	+ alter table 表名 drop age; 	删除age字段
	+ rename 旧表名 to 新表名;	修改表名
	+ alter table 表名 character set gbk/utf8;	修改字符集
+ insert/update/delete 数据库操作语句， 用来操作数据库数据
	+ insert into 表名 values(...),(...),...; 添加一条、多条数据
	+ insert into 表名 (字段,字段,...) values (值1, 值2, ...); 指定字段添加数据，其他为默认
	+ update 表名 set 字段 = 0;		全表修改
	+ update 表名 set 字段 = 0 where 字段 = 值1 or 字段 = 值2; 	指定条件修改
	+ update 表名 set 字段1 = 值1, 字段2 = 字段2 + 值2 where 字段 = 值;
			
			如将students表的“name”为“大明”的数据，改为“name”为“小明”，“score”增加20
			```
			update students set name = '小明' , score = score + 20 where name = '大明';
			```
	+ delete from 表名 where id = 1;	删除记录	
+ select 数据查询语句
	+ `select * from 表名`
	+ `select 字段1, 字段2, ... from 表名`
	+ 查询条件
			
			```
			= < <= != <> > >= 
			between ... and 
			in(set) 在某个集合内
			not in(set) 不在集合内
			is null 为空
			is not null 不为空
			```
	+ 模糊查询 like '_'匹配任意一个字符  '%'匹配任意0个或多个字符
	+ 去重 distinct  `select distinct 字段1 from 表名`  对字段1去重，一般只对一个字段去重
	+ 字段计算 `select 字段1 + 字段2 form 表名` 对字段1和字段2进行加法运算
			```
			select english + chinese from 表名  // 查询英语和语文得分的总和
			select ifnull(english + chinese, 0) from 表名 	// 如果有值为null的话，用0代替null
			select ifnull(english + chinese, 0) as score from 表名 	// as 可以取别名，也可以省略不谢as
			select ifnull(tab.english + tab.chinese, 0) from 表名 as tab	// 对表起别名
			select english as en from 表名 // 对english 字段取别名为en
			```
	+ 排序 order by     ASC 升序  DESC 降序
			```
			select * from 表名 order by 字段 ASC/DESC;
			select * from 表名 order by 字段1 ASC/DESC, 字段2 ASC/DESC;		// 组合排序，优先按字段1排序，如果相等，按字段2排序
			```
	+ 聚合函数
		+ count 返回不为null的数据的记录数
				```
				select count(字段) from 表名; 	// 返回字段不为空的数据条数
				select count(*) from 表名 where 字段1 > 20; 	// 返回字段1 大于20的条数
				select count(*) from 表名 where 字段1 + 字段2 > 20; 	// 返回字段1加字段2大于20的条数
				select count(*) from 表名 where 字段1 is not null and 字段2 is not null; 	// 返回字段1和字段2都不为空的条数
				```
		+ sum 求和
				```
				select sum(字段1), sum(字段2) form 表名; 	// 返回字段1的总和 和字段2的总和
				select sum(ifnull(字段1, 0) + ifnull(字段2, 0)) from 表名;		// 返回字段1和字段2的总和，这种方法是同一条数据的两个字段先相加，然后再所有的相加，注意 null和数字相加为null
				select ifnull(sum(字段1)) + ifnull(sum(字段2)) from 表名; 	// 效果同上，两个字段分别求和再相加，sum会过滤null数据
				```
		+ avg 平均数
				```
				select avg(字段) from  表名; 	// 返回字段的平均值，会自动过滤null的条数
				select avg(ifnull(字段, 0) from 表名;		// 返回字段所有条数的平均值
				```
		+ max min
				```
				select max(字段), min(字段) from 表名;		// 忽略空
				```
	+ 分组 group by
			```
			select * from 表名 group by (字段);		// 不能这么用，只会返回每个分组的第一条数据
			select sex, group_concat(name) from 表名 group by sex;		// 按sex字段分组 返回sex字段和名字的拼接
			select sex, sum(score) from 表名 group by sex;		// 按sex分组 返回sex和每个sex组的score总和
			select sex, count(*) from 表名 where age > 30 group by sex;	// 按sex分组，返回sex和每组年龄大于30的  where只能用于分组前，过滤掉的数据不会进行分组，不能使用聚合函数
			select sex, sum(score) from 表名 group by sex having sum(score) > 100;	// 按sex分钟，返回总和大于100的组  having只能用于分组后的再次筛选，可以使用聚合函数
			```
+ 实体完整性
	+ 主键约束 primary key
		+ 不能为空
		+ 不能重复
		+ 联合主键 不允许联合的主键全部相同，可以部分相同
	+ 唯一约束 unique 允许为空 不许重复 一般用于手机号
	+ 自动增长 auto_increment 即使删除了中间的数据，也会继续增长下去，必须配primary key  或者 unique 使用
+ 参照完整性
	+ 指表与表之间的对应关系，通过主键和外键建立或两个表的触发器来实现
	+ 主表、从表 数据库的主键、外键要求类型一致，外键中的值必须是另一张表中主键的内容 
	+ 外键 foreign key
			```
			alter table student add constraint s_c_id foreign key (sid) peferences clazz(sid);
			// 给student表的sid字段设置为外键（取名为s_c_id），指向clazz表的sid字段
			```
+ 域完整性/列完整性
	+ 数据类型约束 （参见数据类型）
	+ 非空约束 not null
	+ 默认值约束 default
+ grant/revoke/commit 数据控制语言，用来授予或回收数据库的某种特权，或操作事务特性
+ desc xx 查看某个表的现有字段信息
	
## 常用数据类型
+ 整数--参数m并不能起到限制长度的作用
	+ tinyint(m) 1个字节 范围-128~127
	+ smallint(m) 2个字节 范围-32768~32767
	+ mediumint(m) 3个字节 范围-8388608~8388607
	+ int(m) 4个字节 范围-2147483648~2147483647		没有具体要求一般都用int m一般是11
	+ bigint(m) 8个字节 范围+-9.22乘以10的18次方
+ 浮点数
	+ FLOAT(m, d) 单精度浮点型 8位精度（4字节）m总个数 d小数位
	+ DOUBLE(m, d) 双精度浮点型 16位精度（8字节） m总个数 d小数位DECIMAL
	+ DECIMAL 定点型 推荐使用
+ 字符类型 
	+ char(n) 固定长度，最多255个字符
	+ varchar(n) 可变长度，最多65535个字符，一般255以内
	+ tinytext 可变长度，最多255个字符
	+ text 可变长度，最多65535个字符
	+ mediumtext 可变长度，最多2的24次方-1个字符
	+ logtext 可变长度，最多2的32次方-1个字符
+ 日期 Date Datetime TimeStamp（如果有修改，数据库会自动刷新，一般用于最后修改时间） time year
## 关键字
+ NULL	空
+ NOT NULL	不允许空
+ DEFAULT	默认值
+ PRIMARY KEY	主键
+ AUTO_INCREMENT	自增
+ UNSIGED	无符号
+ CHARACTER SET name	指定字符集
## navicat mysql可视化
	
参考 https://blog.csdn.net/a599174211/article/details/82795658

+ 如果出现链接错误'1251'，是因为数据库版本过高，navicat版本太老，不支持。输入`use mysql` `alter user 'root'@'localhost' identified with mysql_native_password by 'Sun@123'` `flush privileges`
+ 错误"Err 1055 - Expression #1 of ORDER BY clause is not in GROUP BY clause and contains nonaggregated column 'information_schema.PROFILING.SEQ' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by"

	sql_mode 不兼容
	```
	show variables like "sql_mode"; 
	set sql_mode='NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES';
	```
+ 登录mysql时出现“Access denied for user 'root'@'localhost' (using password: YES)”错误
	1. 以管理员身份运行命令行，输入命令：net stop mysql，以停止MySQL服务
	2. 设置跳过验证，进入到mysql安装目录下的bin路径，在mysql/bin/目录下输入命令：`mysqld --shared-memory --skip-grant-tables`，（注意：一定要有`–shared-memory`，否则无法正常设置`–skip-grant-tables`并启动mysql服务），正常情况下，输完这条命令，该命令行窗口应该卡住不动
	3. 无密码登录：新开一个CMD窗口，进入到mysql安装目录下的bin路径，无需重复启动mysql服务，在mysql/bin/目录下输入`mysql`，此时应该可以连接成功，作者尝试的时候大多是卡在了这里，原因参照第二步。
	4. 重置root密码为空（注意：这里需先置为空密码，否则无法登陆）：在第三步的cmd窗口中输入命令：`update mysql.user set authentication_string='' where User = 'root'`; 
	5. 退出所有命令行，重新登陆数据库，（若显示服务未启动，需先启动MySQL服务，输入`net start mysql`）使用如下命令重新修改root密码：`alter user 'root'@'localhost' identified by  '123';`。
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
