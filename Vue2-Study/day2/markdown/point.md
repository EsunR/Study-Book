# 数组的方法

## `forEach` 方法
方法对数组的每个元素执行一次提供的函数。
> array.forEach(callback(currentValue, index, array){ //do something }, this)
> array.forEach(callback[, thisArg])

<br>

## `some` 方法
`some` 不同于`forEach` ，`some` 可以通过 `return ture` 来终止遍历  
> 语法:   
> arr.some(callback[, thisArg])
> 
> 参数:  
> `callback` 用来测试每个元素的函数，接受三个参数：  
>> `currentValue` 数组中正在处理的元素。  
>> `index` 可选 数组中正在处理的元素的索引值。  
>> `array`可选 `some()`被调用的数组。  
>
> `thisArg`可选 执行 `callback` 时使用的 this 值。

**EXP:** 查找数组list中值为“2”的项，并从数组中删除该项，同时在查找到该项时跳出循环体。
```js
var list = [0,1,2,3];
list.some((currentValue, index)=>{
    if(currentValue == 2){
        list.splice(index, 1);
        return true;
    }
    console.log("step:", index);
})
console.log('list: ', list);
```
```
step: 0
step: 1

list: 
Array(3) [0, 1, 3]
```

<br>

## `findIndex` 方法
`findIndex` 专门用来返回索引值，如果不存在查找的值则返回-1，同时跟 `some` 方法类似，在回调函数中 `return true` 时，也会跳出循环。

> 语法:  
> arr.findIndex(callback[, thisArg])  
> 
> 参数  
> `callback` 针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
>>  `element`
>>  当前元素。  
>>  `index`
>>  当前元素的索引。  
>>  `array`
>>  调用 findIndex 的数组。
> 
> `thisArg`
> 可选，执行 callback 时作为 this 对象的值.

**EXP:** 输出值为“2”的元素所在的索引值
```js
var list = [0,1,2,3];
var index = list.findIndex((element, index)=>{
    if(element == 2){
        return true;
    }
    console.log("step:", index);
})
console.log("index:", index);
```
```
step: 0
step: 1
index: 2
```


<br>

## `filter` 方法
依据条件过滤数组，并返回一个新数组。
> 语法：  
> array.filter(function(currentValue,[index],[arr]), [thisValue])
> 
> 参数:  
> `currentValue` 当前元素的值  
> `index` 当前元素的索引值  
> `arr` 当前元素属于的数组对象  
> `thisValue` 对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，"this" 的值为 "undefined"

**EXP:** 从数组中过滤出大于2的元素，并存放在一个新的数组中
```js
var arr = [0,1,2,3,4,5,6];
var newArr = arr.filter((currentValue)=>{
    if(currentValue > 2){
        return currentValue;
    }
})
console.log('newArr: ', newArr);
```
```log
newArr: 
Array(4) [3, 4, 5, 6]
```

