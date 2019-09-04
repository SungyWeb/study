# js技巧

## 数组去重

1. 该技巧适用于包含基本类型的数组：undefined、null、boolean、string和number，如果数组中包含了一个object,function或其他数组，则不适用

```javascript
var arr = [1,2,2,4,5,4,1];
var uniqueArr1 = [...new Set(arr)];
var uniqueArr2 = Array.from(new Set(arr));
```
2. 使用filter和indexOf实现

```javascript
var arr = [1,2,2,4,5,4,1];
var uniqueArr3 = arr.filter((v, i) => i === arr.indexOf(v));
```
## 确保数组长度

```javascript
var arr = Array(5).fill('');
```

## 数组映射

```javascript
var arr = [
    {
        name: 'aa',
        age: 12
    },
    {
        name: 'bb',
        age: 13
    }
];
// 希望得到 ['aa', 'bb']
```
1. Array.map

```javascript
var arr1 = arr.map(x => x.name);
```

2. Array.from

```javascript
var arr2 = Array.from(arr, x => x.name)
```

## 过滤掉数组中falsy的值

```javascript
const array = [0, 1, '0', '1', '大漠', 'w3cplus.com', undefined, true, false, null, 'undefined', 'null', NaN, 'NaN', '1' + 0];
var arr =  array.map(item => { return item }).filter(Boolean) 
// > Result: (10) [1, "0", "1", "大漠", "w3cplus.com", true, "undefined", "null", "NaN", "10"]；
```

## 拍平多维数组

1. 二维数组

```javascript
var a = [1,2,[3,4],5,6];
var b = [].concat([...a]);  // concat 可以接受多个参数
```

2. 多维数组

```javascript
function flattenArray(arr) {
    var flattened = [].concat(...arr);
    return flattened.some(x => Array.isArray(x)) ? flattenArray(flattened) : flattened;
}
var arr = [1,[2,[3,4,[5,6],7],8],9];
var arr1 = flattenArray(arr);
```

## 数组中获取最大最小值

apply的参数是数组，call的参数是多个值，

```javascript
var arr = [1,3,5,7,2,9,4];
var n1 = Math.max.apply(null, arr);
var n2 = Math.max.apply(Math, arr);
var n3 = Math.max.call(null, ...arr);
var n4 = Math.max(...arr);
```
