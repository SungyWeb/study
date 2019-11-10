# typescript 介绍

1. ts是微软开发的开源编程语言
2. ts是js的超集，包含、扩展了es5、es6+，更像是java、c#这样的面向对象语言
3. 谷歌也在大力推广（angualr2+)
4. 根据[官方文档](https://www.tslang.cn/docs/home.html)而来，版本3.1

# 安装

`npm install -g typescript`

`tsc -v`

`tsc demo.ts`

# vscode 自动编译

1. 创建tsconfig.json，`tsc --init`生成配置文件， 也可以手动创建
2. 点击终端-运行任务-tsc:监视-tsconfig.json, 然后就可以自动编译
3. 遇到问题"The specified path does not exist:..."，将默认终端改为powershell

# 数据类型

1. 布尔类型 boolean
2. 数字类型 number
3. 字符串类型 string
4. 数组类型
    + 第一种定义方式 `var arr: number[] = [1, 2, 4];`
    + 第二种定义方式 `var arr: Array<number> = [1,2,3]`
5. 元组类型: 属于数组类型，数组内容数据类型不一定
    + 定义方式， 为数组中的每一项指定数据类型
        ```typescript
        var arr: [string, number] = ['a', 1];
        ```
6. 枚举类型
    + 在计算机语言中，一般用一个数值表示一个状态，如0表示成功，1表示失败，但这种方式易读性差。如果事先考虑到某一个变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，这种方法称为枚举方法，用这种方法定义的类型称为枚举类型
    + 定义方式
        ```typescript
        // 正常人
        enum Flag {success = 1, error = 2};
        let res: Flag = Flag.success;
        console.log(res);   // 1
        console.log(Flag[2]);   // error
        // 特殊1： 如果没有标识符没有赋值，则返回下标，从0开始
        enum Flag {success, error};
        let res: Flag = Flag.success;
        console.log(res);   // 0
        //特殊2： 下标不连续
        enum Flag {success, error = 4, wait};
        let res1: Flag = Flag.success;
        let res2: Flag = Flag.error;
        let res3: Flag = Flag.wait;
        console.log(res1, res2, res3);   // 0 4 5
        // 特殊3： 值为字符串
        enum Flag {success = 'good', error = 'bad'};
        let res: Flag = Flag.success;
        console.log(res);   // good
        console.log(Flag['bad']);   // undefined
        ```
7. 任意类型 any
8. null和undefined
9. void类型 表示没有任何类型，一般用于定义方法没有返回值
10. never类型 表示其他类型，代表不会出现的值
    > never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

    > never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
    ```typescript
    let a: never;
    a = (() => {
        throw Error('错误');
    })();
    ```
11. object类型 表示非原始类型(除了number、string、boolean、symbol、null、undefined之外)
    ```typescript
    function fn(param: object): void {
        console.log(1);
    }
    fn(true);
    fn([]);
    ```
12. 类型断言
    > 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

    > 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。
    ```typescript
    // 方式一 尖括号
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;

    // 方式二 as
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
    ```

# 函数定义
1. 指定参数类型、返回类型
2. 可选参数 必须在所有必须参数的后面
3. 默认参数
4. 剩余参数
    ```typescript
    function fn(a, ...res: number[]): void {

    }
    fn(1, 2, 3, 4, 5)
    ```
5. 重载

    多个重名函数，根据参数不同来实现不同的功能

    ```typescript
    function getInfo(name: string): string;
    function getInfo(age: number): string;
    function getInfo(param: any): string {
        if (typeof param === 'string') {
            return '名字是' + param;
        }else {
            return '年龄是' + param;
        }
    }
    ```

# 类

面向对象语言：封装、继承、多态

1. 定义
    ```typescript
    class Person {
        name: string;
        fn: Function;
        constructor (n:string) {
            this.name = n;
            this.fn = function() {
                console.log(1);
            }
        }
        say () {
            console.log('名字是' + this.name);
        }
    }
    // name: string 可以不写吗？
    // 可以不写constructor吗？
    // fn与say有什么区别
    ```
2. 继承 extends super 
    ```typescript
    class Web extends Person {
        constructor(name: string) {
            super(name);
        }
    }
    ```
3. 修饰符
    + public 在类、子类、类外都可以访问
    + protected 在类、子类可以访问，类外不可以
    + private 在类内可以访问，子类、类外不可以
    ```typescript
    class Person {
        public a1: number;
        protected a2: number;
        private a3: number;
        constructor(a: number, b: number, c: number) {
            this.a1 = a;
            this.a2 = b;
            this.a3 = c;
        }
        say() {
            console.log(this.a1, this.a2, this.a3);
        }
    }
    class Web extends Person {
        constructor(a: number, b: number, c: number) {
            super(a, b, c)
        }
        speak() {
            console.log(this.a1, this.a2, this.a3);
        }
    }
    var p = new Person(1,2,3);
    var w = new Web(4, 5, 6);
    console.log(p.a1, w.a1);
    console.log(p.a2, w.a2);
    console.log(p.a3, w.a3);
    ```
4. 对比es6
    + es6只有一个修饰符 static ，用于静态**方法**，即无法通过实例调用，且可以被子类继承，静态方法比如`$.get()`
5. 多态 

    定义：父类定义一个方法，但不去实现（不写具体内容），让继承它的子类取实现，每一个子类有不同的实现
    ```typescript
    class Person {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        say() {
            // 不去实现
        }
    }
    class Web extends Person {
        constructor(name: string) {
            super(name);
        }
        say() {
            console.log('我是前端工程师');
        }
    }
    class Javaer extends Person {
        constructor(name: string) {
            super(name);
        }
        say() {
            console.log('我是java工程师');
        }
    }
    ```
6. 抽象类和抽象方法

    抽象类提供其他类的基类，但不去具体实现，定义了一个类的标准。

    用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现，并且派生类中必须实现；且抽象类不能被实例化。
    ```typescript
    abstract class A {
        name: string;
        constructor(name:string) {
            this.name = name;
        }
        abstract eat(some: string):any;
        say() {
            console.log(this.name)
        }
    }
    ```

# 接口

在面向对象语言中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，它起到了限制和规范的作用。

1. 属性接口 对批量方法传入参数进行约束
    ```typescript
    interface FullName {
        firstName: string;
        lastName: string;
    }
    function fn (name: FullName) {
        return name.firstName + ' ' + name.lastName;
    }
    fn({firstName: '张', lastName: '三'});  // 不能有多余属性
    // fn({firstName: '张', lastName: '三', age:12});
    const obj = {firstName: '张', lastName: '三', age:12};
    fn(obj);    // 这种方式可以有多余属性
    // 参数对象属性顺序是否有影响？
    ```
2. 可选属性、额外属性（[propName:string]: any]）
3. 函数类型
    ```
    interface Search {
        (str: string, keyword: string): boolean;
    }
    let mySearch: Search;
    mySearch = function (str: string, keyword: string) {
        let res = str.indexOf(keyword);
        return res > -1;
    }
    ```
4. 可索引接口