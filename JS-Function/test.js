
let arr = [1,[2,[3],[[4,5]]], 6, 7]

// ES10 flat() 方法
let arrFlat1 = arr.flat(Infinity);
console.log(arrFlat1) // [1, 2, 3, 4, 5, 6, 7]

// 利用正则表达式
// 先序列化
let strFlat = JSON.stringify(arr)
let arrFlat2 = strFlat.replace(/(\[|\])/g, '').split(',').map(Number)
// .map(Number) 方法可以将字符串数组变成数字数组
console.log(arrFlat2) // [1, 2, 3, 4, 5, 6, 7]