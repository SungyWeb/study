# typescript笔记

根据官方文档而来，版本3.1

## 基础类型

1. 布尔值boolean
2. 数字number
3. 字符串string
4. 数组

    ```typescript
    let list: number[] = [1,2,3];
    let list: Array<number> = [1,2,3];
    ```

5. 元组： 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同(即数组中得类型不必相同)

    ```typescript
    let x: [string, number] = ['aa', 12];
    // 当使用x[0]/x[1]时会自动判断类型
    ```

6. 枚举

    ```typescript
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;		// 输出1，默认从0开始
    let d: Color = Color[0];	// 输出Red
    ```

    ```typescript
    // 手动指定编号
    enum Color {Red = 1, Green = 2, Blue = 4}
    let c: Color = Color.Green;		// 输出2
    ```

    ```typescript
    enum Color {Red = 5, Green, Blue}
    let c: Color = Color.Green;		// 输出6，自动排序
    ```

7. Any 任意类型
8. Void 没有类型，一般用于函数没有返回值，该类型得值只能时undefined和null
9. Null 和 Undefined
10. Never 永不存在的值的类型
11. Object 表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型，一般用于规定函数得参数类型
12. 类型断言，清楚地知道一个实体具有比它现有类型更确切的类型

    ```typescript
    let a: string = 'string';
    let len: number = (<string>a).length;
    let len: number = (a as string).length;
    ```

## 变量声明

1. let & const
使用最小特权原则，所有变量除了你计划去修改的都应该使用const

2. 解构

    ```typescript
    let arr = [1,2];
    let [fir, sec] = arr;
    function fn ([f, s]) {}
    fn(arr);
    let arr1 = [1,2,3,4,5];
    let [first, ...rest] = arr1;
    // first = 1;
    // rest = [2,3,4,5];
    let [first1] = arr1;
    // first1 = 1;
    let [, second, , fourth]  = arr1;
    // second = 2;
    // fourth = 4;
    ```

    ```typescript
    let o = {
        a: 1,
        b: 2,
        c: 3
    };
    let {a, b} = o;
    let { a, ...passthrough } = o;
    let { a: newName1, b: newName2 } = o;	// 重命名
    let {a, b}: {a: string, b: number} = o;	// 指定类型
    ```

    ```typescript
    // 指定默认值
    function f({ a="", b=0 } = {}): void {
        // ...
    }
    ```

3. 展开

    ```typescript
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5];		// [0, 1, 2, 3, 4, 5]

    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { ...defaults, food: "rich" };


    // 它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
    class C {
    p = 12;
    m() {
    }
    }
    let c = new C();
    let clone = { ...c };
    clone.p; // ok
    clone.m(); // error!
    ```

## 接口

1. 初探

    ```typescript
    // 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
    interface LabelledValue {
    label: string;
    }

    function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
    }

    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);

    printLabel({size: 10, label: "Size 10 Object"}); // 报错，提示size属性在接口不存在
    ```

2. 可选属性

    ```typescript
    interface SquareConfig {
    color?: string;
    width?: number;
    }

    function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
    }

    let mySquare = createSquare({color: "black"});
    ```

3. 只读属性

    ```typescript
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    let p1: Point = { x: 10, y: 20 };
    p1.x = 5; // error!
    ```

    ```typescript
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    ro[0] = 12; // error!
    ro.push(5); // error!
    ro.length = 100; // error!
    a = ro; // error!
    // 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的
    // 但是你可以用类型断言重写：
    a = ro as number[];
    ```

    最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。

4. 额外的属性检查

    ```typescript
    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): { color: string; area: number } {
        // ...
    }

    // error: 'aaa' not expected in type 'SquareConfig'
    let mySquare = createSquare({ aaa: "red", width: 100 });

    // 绕开这些检查非常简单。 最简便的方法是使用类型断言：
    let mySquare = createSquare({ aaa: "red", width: 100 } as SquareConfig);
    // 最佳是够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性
    interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
    }
    ```

5. 函数类型

    ```typescript
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }

    let mySearch: SearchFunc;
    // 参数名可以与接口定义的名字不一样
    mySearch = function(src: string, sub: string): boolean {
        let result = src.search(sub);
        return result > -1;
    }
    ```

6. 可索引的类型

    ```typescript
    interface StringArray {
    [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];

    let myStr: string = myArray[0];
    ```

    ```typescript
    interface ReadonlyStringArray {
        readonly [index: number]: string; // 只读，禁止修改
    }
    let myArray: ReadonlyStringArray = ["Alice", "Bob"];
    myArray[2] = "Mallory"; // error!
    ```

7. 类类型

    ```typescript
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date);	// 定义一个方法，在类中实现
    }

    class Clock implements ClockInterface {
        currentTime: Date;
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }
    ```

8. 继承接口

    ```typescript
    interface Shape {
        color: string;
    }

    interface Square extends Shape {
        sideLength: number;
    }

    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    ```

    ```typescript
    // 继承多个接口
    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke {
        sideLength: number;
    }

    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;
    ```

9. 混合类型

    ```typescript
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = <Counter>function (start: number) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
    ```

## 类

1. 类

    ```typescript
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let greeter = new Greeter("world");
    ```

2. 继承

    ```typescript
    class Animal {
        move(distanceInMeters: number = 0) {
            console.log(`Animal moved ${distanceInMeters}m.`);
        }
    }

    class Dog extends Animal {
        bark() {
            console.log('Woof! Woof!');
        }
    }

    const dog = new Dog();
    dog.bark();
    dog.move(10);
    dog.bark();
    ```

    ```typescript
    class Animal {
        name: string;
        constructor(theName: string) { this.name = theName; }
        move(distanceInMeters: number = 0) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }

    class Snake extends Animal {
        n: number;
        dis: number;
        constructor(name: string, n: number) { super(name); this.n = n; }
        move(distanceInMeters = 5) {
            console.log("Slithering...");
            this.dis = distanceInMeters;	// ok
            super.move(distanceInMeters);
        }
    }

    class Horse extends Animal {
        constructor(name: string) { super(name); }
        move(distanceInMeters = 45) {
            console.log("Galloping...");
            super.move(distanceInMeters);
        }
    }

    let sam = new Snake("Sammy the Python", 12);
    let tom: Animal = new Horse("Tommy the Palomino");

    sam.move();
    tom.move(34);
    ```

3. 公共/私有/受保护的修饰符

   + 公共，不写则默认公共

        ```typescript
        class Animal {
            public name: string;
            public constructor(theName: string) { this.name = theName; }
            public move(distanceInMeters: number) {
                console.log(`${this.name} moved ${distanceInMeters}m.`);
            }
        }
        ```

   + 私有 当成员被标记成 private时，它就不能在声明它的类的外部访问，不可以继承

        ```typescript
        class Animal {
            private name: string;
            constructor(theName: string) { this.name = theName; }
        }

        new Animal("Cat").name; // 错误: 'name' 是私有的.
        ```

        ```typescript
        class Person {
            private name: string;
            constructor(name: string) { this.name = name; }
        }

        class Employee extends Person {
            
            constructor(name: string) {
                super(name);	
            }

            public getElevatorPitch() {
                // name 是 Person 私有的，子类不能使用
                return `Hello, my name is ${this.name}.`;
            }
        }

        ```


   + 受保护的 不能在声明它的类的外部访问，但可以被继承下来，在子类的内部使用

        ```typescript
        class Person {
            protected name: string;
            constructor(name: string) { this.name = name; }
        }

        class Employee extends Person {
            private department: string;

            constructor(name: string, department: string) {
                super(name)
                this.department = department;
            }

            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}.`;
            }
        }

        // let a = new Person('aa');
        // console.log(a.name);	// 不能被实例调用
        // let howard = new Employee("Howard", "Sales");
        // console.log(howard.name); // 不能被实例调用
        // howard.getElevatorPitch();	// 受保护的可以被继承下来，并在类的内部使用
        ```

4. readonly 修饰符 只读属性必须在声明时或构造函数里被初始化

    ```typescript
    class Octopus {
        readonly name: string;
        readonly numberOfLegs: number = 8;
        constructor (theName: string) {
            this.name = theName;
        }
    }
    let dad = new Octopus("Man with the 8 strong legs");
    dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
    ```

    ```typescript
    class Octopus {
        readonly numberOfLegs: number = 8;
        constructor(readonly name: string) {
        }
    }
    ```

5. getter/setter 存取器

    ```typescript
    let passcode = "secret passcode";

    class Employee {
        private _fullName: string;

        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        }
    }

    let employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName);
    }

    // 需要指定编译到版本ES5或以上 tsc **.ts -t es5
    ```

6. static 静态属性

    这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 static定义 origin，因为它是所有网格都会用到的属性。 每个实例想要访问这个属性的时候，都要在 origin前面加上类名。 如同在实例属性上使用 this.前缀来访问属性一样，这里我们使用 Grid.来访问静态属性

    ```typescript
    class Grid {
        static origin = {x: 0, y: 0};
        calculateDistanceFromOrigin(point: {x: number; y: number;}) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
        constructor (public scale: number) { }
    }

    let grid1 = new Grid(1.0);  // 1x scale
    let grid2 = new Grid(5.0);  // 5x scale

    console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
    console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
    ```

## 函数

1. 函数类型

    + 为函数定义类型

        ```typescript
        function add(x: number, y: number): number {
        return x + y;
        }

        let myAdd = function(x: number, y: number): number { return x + y; };
        ```

    + 书写完整函数类型

        ```typescript
        let addNum: (num1: number, num2: number) => number = (x: number, y: number): number => x + y;
        // num1/num2 不必与x/y一致
        ```

    + 推断类型

        在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型

        ```typescript
        let addNum: (num1: number, num2: number) => number = (x: number, y: number): number => x + y;
        ```

2. 可选参数和默认参数

    ```typescript
    // 可选参数
    let fn1 = function(firstName: string, lastName?: string): string {
        return firstName + lastName;
    }
    // 默认值
    let fn1 = function(firstName: string, lastName = 'Jone'): string {
        return firstName + lastName;
    }

    // 剩余参数和可选参数后面都不能再有参数。剩余参数可放在可选参数后
    ```

3. 剩余参数

    ```typescript
    function buildName(firstName, ...restOfName: string[]): string {
        return firstName + ' ' + restOfName.join(' ');
    }
    let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
    ```

4. this
    + 设置this类型

        ```typescript
        interface Card {
            suit: string;
            card: number;
        }
        interface Deck {
            suits: string[];
            cards: number[];
            createCardPicker(this: Deck): () => Card;
        }
        let deck: Deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // this参数是个假的参数，它出现在参数列表的最前面，如果不写，也能编译成功，但是在类型推断时，this的类型是any
            createCardPicker: function(this: Deck) {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return {suit: this.suits[pickedSuit], card: pickedCard % 13};
                }
            }
        }

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        alert("card: " + pickedCard.card + " of " + pickedCard.suit);
        ```
    
    + this在回调函数里

        ```typescript
        interface UIElement {
            addClickListener(onclick: (this: void, e: Event) => void): void;
        }

        class Handler {
            info: string;
            onClickBad(this: Handler, e: Event) {
                this.info = e.message;
            }
        }
        let h = new Handler();
        uiElement.addClickListener(h.onClickBad); // error! 
        // 因为addClickListener规定了this的类型是void，onClickBad的this类型是Handler
        // 修改 Handler 类
        class Handler {
            info: string;
            onClickGood(this: void, e: Event) {
                // 这里就不能用this了，因为this是void
                console.log('clicked!');
            }
        }
        let h = new Handler();
        uiElement.addClickListener(h.onClickGood);
        // 如果两个功能都需要，就必须使用箭头函数
        class Handler {
            info: string;
            onClickGood = (e: Event) => { this.info = e.message }
        }
        ```

    + 重载  
        
        重载的pickCard函数在调用的时候会进行正确的类型检查

        ```typescript
        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x: {suit: string; card: number; }[]): number;
        function pickCard(x: number): {suit: string; card: number; };
        function pickCard(x): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }

        let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
        let pickedCard1 = myDeck[pickCard(myDeck)];
        alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        let pickedCard2 = pickCard(15);
        alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
        ```

## 泛型

泛型可以让不同类型的数据，复用同样的方法或类

1. 示例

    需要一个函数能够返回它的接收值

    ```typescript
    // 这样就将参数类型限制了
    function identity(arg: number): number {
        return arg;
    }
    ```

    ```typescript
    // 不确定参数的类型与返回值的类型是否一致
    function identity(arg: any): any {
        return arg;
    }
    ```

    ```typescript
    function identity<T>(arg: T): T {
        return arg;
    }
    ```

    我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。

    我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

    可以有两种方式调用identity

    ```typescript
    let output = identity<string>("myString");  // 指定了T的类型为string
    let output = identity("myString");  // 利用了类型推论，即编译器会根据传入的参数自动地帮助我们确定T的类型
    ```

2. 使用泛型变量

    ```typescript
    function loggingIdentity<T>(arg: T): T {
       console.log(arg.length);  // Error: T doesn't have .length, 因为arg可能是数字，数字没有length
       return arg;
   }
    ```

    ```typescript
    function loggingIdentity<T>(arg: T[]): T[] {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }
    loggingIdentity([1,2,3]);   // ok
    loggingIdentity(['a', 'b', 'c']);   // ok
    loggingIdentity([{}, 'b', 'c']);   // ok
    ```

    泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组。 如果我们传入数字数组，将返回一个数字数组，因为此时 T的的类型为number。 **这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，**增加了灵活性。

    ```typescript
    // 也可以这样实现
    function loggingIdentity<T>(arg: Array<T>): Array<T> {
       console.log(arg.length);  // Array has a .length, so no more error
       return arg;
   }
    ```

3. 泛型接口

    ```typescript
    interface GenericIdentityFn {
        <T>(arg: T): T;
    }

    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: GenericIdentityFn = identity;
    ```

    ```typescript
    // 将泛型作为整个接口得一个参数
    interface GenericIdentityFn<T> {
        (arg: T): T;
    }

    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: GenericIdentityFn<number> = identity;
    ```

    不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。 当我们使用 GenericIdentityFn的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型

4. 泛型类

    ```typescript
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
    ```

5. 泛型约束

    在2中，我们想要限制函数去处理任意带有.length属性的所有类型。为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束

    ```typescript
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);  // Now we know it has a .length property, so no more error
        return arg;
    }
    loggingIdentity([1,2]); // ok
    loggingIdentity('asdf'); // ok
    loggingIdentity({length: 10, value: 3}); // ok
    loggingIdentity(5); // error
    ```

    在泛型约束中使用类型参数 你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束

    ```typescript
    function getProperty(obj: T, key: K) {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a"); // okay
    getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
    ```

6. 多个类型变量

```typescript
class Pair<TKey, TValue> {
    private _key: TKey;
    private _value: TValue;
    constructor(key: TKey, value: TValue) {
        this._key = key;
        this._value = value;
    }

    get key() { return this._key; }
    get value() { return this._value; }
}   
```

## 枚举

### 枚举

使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。

##### 数字枚举

我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。

如果不指定值，则默认从0开始。

```typescript
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
function respond(a: string, b: Direction) { 
    // ... 
}
respond("Princess Caroline", Response.Left)
console.log(Response[2]); // Left   一般不这么用，因为有时候我们不知道Left对应的值(编号)可以用下面的方法
console.log(Response[Response.Left]);    // Left
```

##### 字符串枚举

在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

##### <font color=pink>*强烈不建议将枚举项的值设置为字符串类型，也不建议手动设置枚举的值*</font>

## 装饰器

### 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

## 高级类型

### 交叉类型(&)

```typescript
interface A {a:number};
interface B {b:string};

const a:A = {a:1};
const b:B = {b:'1'};
const ab:A&B = {...a,...b};
```
### 联合类型(|)

```typescript
let stringAndNumber: string | number;
stringAndNumber = 'ts';
stringAndNumber = 7;
```

### 类型别名

别名 type， 就是给一个类型起个新名字便于记忆和使用

1. 用在有联合类型的场景下

```typescript
type Name = string;
type ShowName = () => string; 
type NameOrShowName = Name | ShowName; // 联合类型

const getName = (name: NameOrShowName) => {
    if(typeof name === 'string'){
        return name;
    } else {
        return name();
    }
}

let showName = () => 'pr is a boy';

console.log(getName('pr')); // pr
console.log(getName(showName())); // pr is a boy
```

2. 字符串字面量类型, 用来约束只能从定义的字段中取值

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
const handleEvent: (a: Element, b: EventNames) => string = (ele: Element, event: EventNames) => {
    return `${ele} ${event}`;
}

handleEvent(document.getElementById('header'), 'scroll');
handleEvent(document.getElementById('footer'), 'keyup');
```

3. type 与 interface的区别

相同点

+ 都可以描述一个对象或者函数

```typescript
interface

interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}

type

type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number)=> void;
```

+ 都允许拓展（extends）

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。


```typescript
interface extends interface
interface Name { 
  name: string; 
}

interface User extends Name { 
  age: number; 
}

type extends type
type Name = { 
  name: string; 
}
type User = Name & { age: number  };

interface extends type
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

type extends interface
interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

不同点

接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字

type 可以而 interface 不行

+ type 可以声明基本类型别名，联合类型，元组等类型

```typescript
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

+ type 语句中还可以使用 typeof 获取实例的 类型进行赋值

```typescript
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```

+ 其他骚操作

```typescript
type StringOrNumber = string | number;  
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

interface 可以而 type 不行

+ interface 能够声明合并

```typescript
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

+ type 是不允许 extends 和 implement 的，但是 type 缺可以通过交叉类型 实现 interface 的 extend 行为

type 与 type 交叉

```typescript
type Name = { 
  name: string; 
}
type User = Name & { age: number  };
```
type 与 interface 交叉

```typescript
interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

## 命名空间 namespace

对类型进行分组管理

```typescript
namespace Food {
    export type A = Window;
    export interface Fruits{
        taste: string;
        hardness: number;
    }

    export interface Meat{
        taste: string;
        heat: number;
    }
}

let meat: Food.Meat;
let fruits: Food.Fruits;
```

如何引入写好的命名空间?

1. 通过 "/// <reference path='xxx.ts'/>" 导入
通过reference进行导入相当于xxx.ts文件内的命名空间和当前文件进行了合并

2. 通过import导入

```typescript
// xxx.ts
// 使用export导出
export interface Fruits{
    taste: string;
    hardness: number;
}

export interface Meat{
    taste: string;
    heat: number;
}

// yyy.ts
import {Food} from './xxx'; // 使用import导入
let meat: Food.Meat;
let fruits: Food.Fruits;
```

## 声明文件

存放声明语句的文件，叫声明文件。通常格式为 xxx.d.ts

```jQuery.d.ts
declare const jQuery2: (selector: string) => any;
```

```typescript
jQuery2('#root');
```

declare var、declare const、declare let
declare function declareFunc(selector: string): any;
declare class DeclareClass {
    name: string;
    constructor(name: string);
    showName(): string;
    showName2() {
        return `我是${this.name}`;
    }
}


第三方声明文件
https://microsoft.github.io/TypeSearch/




