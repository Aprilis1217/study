/**
 * ES6 的环境开发
 * 1. 建立工程项目：src 文件夹书写 ES6 代码，写的 js 都放在这里面；dist文件夹利用 babel 编译成的 ES5 代       码，在 HTML 需要引用的 js 文件
 *
 * 2. 初始化项目：运行命令行 npm install init -y; 全局安装 babel-cli; 本地安装 babel-preset-es2015 和      babel-cli
 * npm install -g babel-cli
 * npm install -D babel-preset-es2015 babel-cli
 *
 * 3. 新建一个 .babelrc 配置文件
 * {
 *      "presets": ["es2015"],
 *      "plugins": []
 * }
 */

// 一、新的声明方式  let const
// let 声明的变量有块级作用域, 并且不存在变量的提升

// const 声明的量叫常量, 被定义的常量无法在后期重新赋值; 定义一个常量不给初始值会报语法错误

// var 声明的变量存在变量提升的问题, 不存在块级作用域, 使用时容易造成全局污染


// 二、变量的解构赋值

// 数组的解构赋值
// let a = 1;
// let b = 2;
// let c = 3;
// 等价于
let [a, b, c] = [1, 2, 3];
console.log(a);
console.log(b);
console.log(c);
// 数组模式和赋值模式统一
let [d, [e, f], g] = [4, [5, 6], 7];

// 解构的默认值
let [name,age=21] = ['JSPang---'];
console.log(name + age);
// undefined 和 null 的区别：undefined 是什么都没有，而 null 相当于有值，值为 null
let [nickName,job] = ['JSPang---', null];
console.log(nickName + job);

// 对象的解构赋值
// 注意: 对象的解构赋值和数组的解构赋值有一个重要的不同，数组的元素是按次序排列的，变量的取值有它的位置决定的，而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
// 如果在解构之前就定义了变量，这时候再解构就会报错，解决报错使用小括号
let foo;
({foo} = {foo: 'JSPang'});
console.log(foo);

// 字符串的解构，类似于数组的解构
const [a1,a2,a3,a4,a5,a6] = 'JSPang';
console.log(a1);
console.log(a2);
console.log(a3);
console.log(a4);
console.log(a5);
console.log(a6);

// 三、对象扩展运算符

// 扩展运算符
function jspang (...args) {
    console.log(args[0]); // 1
    console.log(args[1]); // 2
    console.log(args[2]); // 3
    console.log(args[3]); // undefined
}
jspang(1, 2, 3);

// let arr1 = ['www', 'jspang', 'com'];
// // arr1 arr2 指向的同一个堆上
// let arr2 = arr1;
// console.log(arr2); // ["www", "jspang", "com"]
// arr2.push('111');
// console.log(arr1); // ["www", "jspang", "com", "111"]
// console.log(arr2); // ["www", "jspang", "com", "111"]

// 解决以上问题
let arr1 = ['www', 'jspang', 'com'];
let arr2 = [...arr1];
console.log(arr2); // ["www", "jspang", "com"]
arr2.push('222');
console.log(arr1); // ["www", "jspang", "com"]
console.log(arr2); // ["www", "jspang", "com", "222"]

// --------------形参默认值-----------------
/**
function add (x, y = 0) {
    return x + y;
}
console.log(add(1, 2)); // 3
console.log(add(13)); // 13
*/

// ------------解构赋值和形参默认值结合使用----------------
function sum ({x, y = 0}) {
    return x + y;
}
console.log(sum({x: 13, y: 14})); // 打印 27
console.log(sum({x: 520})); // 打印 520

// ----------------------- rest参数 --------------------------
function add (...args) { // 在定义方法的时候，方法的形参列表中使用 ...obj 是 rest 参数
    console.log(args); // 数组 [ 1, 2, 3, 4, 5, 6 ]
    // console.log(args instanceof Array)
    let total = 0;
    for (let i = 0; i < args.length; i++) {
        total += args[i];
    }
    console.log(total); // 打印 21
}
// console.log(total); // ReferenceError: total is not defined
// 前提：在调用 add 方法的时候，参数的个数可能不确定
let arr = [1, 2, 3, 4, 5, 6];
add(...arr); // 在调用函数的时候，使用的 ...obj 表示：扩展运算符

/** 利用 arguments 的特性：
 * function add () {
 *      let total = 0;
 *      for (let i = 0; i < arguments.length; i++) {
 *          total += arguments[i];
 *      }
 *      console.log(total); 打印 21
 * }
 */


//  四、字符串模板
let str1 = 'jspang';
let blog = `<a href="http://www.${str1}.com">技术胖的博客网址</a>`;
document.write(blog);

// 字符串查找是否存在
// 1. ES5 方法: indexOf
// let str2 = 'com';
console.log(blog.indexOf('www') > 0); // true 表示存在

// 2. ES6 方法: includes
console.log(blog.includes('//')); // true 表示存在

// 判断字符串开头是否存在  startsWith
// 判断字符串结尾是否存在  endsWith
/**
 *  padStart();
 *  padEnd();
 * 参数1：填充完毕之后的总长度
 * 参数2：要填充的字符串
 */
//
// 复制字符串
console.log('jspang| '.repeat(3)) // jspang| jspang| jspang|


// 五、ES6 数字操作

// 二进制声明
let binary = 0B010101;
console.log(binary);

// 八进制声明
let octal = 0o666;
console.log(octal);

// 数字验证 Number.isFinite() 只要是数字，不论浮点型还是整型都会返回 true，其他时候会返回 false
console.log(Number.isFinite(12.17)); // true
console.log(Number.isFinite('jspang')); // false
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite(undefined)); // false
console.log(Number.isFinite(null)); // false

// NaN 验证 Number.isNaN() 来进行验证
console.log(Number.isNaN(NaN)); // true

// 判断是否为整数 Number.isInteger()
console.log(Number.isInteger(1217));  // true
console.log(Number.isInteger(-1217));  // true
console.log(Number.isInteger(12.17)); // false

// Number.parseInt() 方法可以根据给定的进制数把一个字符串解析成整数
// Number.parseInt(string[,radix])
// radix为指定基数，说明字符串为多少进制的数字表示。

let strObj = '0110';
console.log(Number.parseInt(strObj, 2)); // 6
console.log(Number.parseInt(strObj, 10)); // 110


// 六、ES6 操作数组
let strA = '3, 4, 5, 6';
let arrayA = Array.of(strA);
console.log(arrayA); // ["3, 4, 5, 6"]

// json 数组格式
let jsonB = {
    '0': 'JSPang',
    '1': '技术胖',
    '2': 'web前端',
    length: 3 // 必须要有 length 属性
}
/**
 * Array.from() 可以通过以下方式来创建数组对象：
 * 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
 * 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）
 */
let arrayB = Array.from(jsonB);
console.log(arrayB); // ["JSPang", "技术胖", "web前端"]

// 另类特殊
let strC = '[1, 2, 3, 4]';
// 使用 eval() 性能低，影响程序，不推荐使用
let arrayC = eval(strC);
console.log(arrayC); // [1, 2, 3, 4]

// find() 实例方法
let arrayD = [1, 2, 3, 4, 5];
console.log(arrayD.find((value, index, arr) => {
    // value: 当前查找的值
    // index: 当前查找的值的索引
    // arr: 当前遍历的数组本身
    return value === 3; // 条件成立返回该 value，否则返回 undefined
}))

// 数组遍历 for-of 循环
let arrayE = ['JSPang', '技术胖', '大胖胖'];
for (let [index, item] of arrayE.entries()) {
    // index 索引
    // item 数组中的每一项
    console.log(index, '---索引', item, '---数组中的每一项');
}

// 七、ES6中的对象
//
// 对象赋值
let namePang = 'jspang';
let skill = 'web前端';
let objPang = {
    namePang,
    skill
}
console.log(objPang); // {namePang: "jspang", skill: "web前端"}

// 对象 key 值构建
let key = 'skill';
let objP = {
    [key]: 'web前端工程师'
}
console.log(objP.skill); // web前端工程师

// 自定义对象方法
let objFn = {
    add: function (a, b=1) {
        return a + b;
    }
}
console.log(objFn.add(2)); // 3

// Object.is() 对象比较

console.log(+0 === -0); // true
console.log('1' === 1); // false
console.log(NaN === NaN); // false
// Object.is('foo', 'foo'); // true
// Object.is({}, {}); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is('1', 1)); // false
console.log(Object.is(NaN, NaN)); // true


// Object.assign() 合并对象

// Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。

// 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

console.log(Object.assign([1, 2, 3], [4, 5])); // [4, 5, 3]

const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target); // {a:1, b:2, c:3}

// 如果只有一个参数，Object.assign会直接返回该参数。
const objAssign = {a: 1};
console.log(Object.assign(objAssign), '只有一个参数')
console.log(Object.assign(objAssign) === objAssign) // true

// 如果该参数不是对象，则会先转成对象，然后返回。
typeof Object.assign(2) // "object"

// 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
// Object.assign(undefined) // 报错
// Object.assign(null) // 报错

// 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

// 八、Symbol 在对象中的作用

// 基本数据类型：String(字符串)、Number(数值)、Boolean(布尔值)、null、undefined、Symbol(原始数据类型)
// 复杂数据类型：Object(对象)
// ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值

// 声明一个 Symbol
let s = Symbol();
console.log(typeof s); // "symbol"

/**
 * 注意，Symbol函数前不能使用new命令，否则会报错。
 * 这是因为生成的 Symbol 是一个原始类型的值，不是对象。
 * 由于 Symbol 值不是对象，所以不能添加属性。
 * 基本上，它是一种类似于字符串的数据类型。
 */
let s1 = Symbol('JSPang');
console.log(s1); // Symbol(JSPang) 红色
console.log(s1.toString()); // Symbol(JSPang) 黑色

// Symbol 构建对象的 key，并调用和赋值
let jsp = Symbol();
let objSy = {
    [jsp]: '技术胖'
}
console.log(objSy[jsp]); // 技术胖
objSy[jsp] = 'web前端';
console.log(objSy[jsp]); // web前端

// Symbol 对象元素的保护作用
let objSymbol = {
    name: 'JSPang',
    skill: 'web前端'
}
let age1 = Symbol();
objSymbol[age1] = 18;
for (let item in objSymbol) {
    console.log(item);
}
console.log(objSymbol)

// 注意：Symbol 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的
// 没有参数的情况
let s11 = Symbol();
let s22 = Symbol();
console.log(s11 === s22); // false

// 有参数的情况
let s33 = Symbol('foo');
let s44 = Symbol('foo');
console.log(s33 === s44); // false


// 九、Set 数据结构
//
// Set 本身是一个构造函数，用来生成 Set 数据结构
const setData = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(val => {
    setData.add(val);
})
console.log(setData); // Set(4) {2, 3, 5, 4} --- Set 数据结构

for (let item of setData) {
    console.log(item); // 2 3 4 5
}

const set = new Set([1, 2, 3, 4, 5, 5]);
console.log([...set]); // [1, 2, 3, 4, 5]

const items = new Set([1, 2, 3, 4, 5, 5, 5, 5, 5]);
console.log(items.size); // 5

// 数组去重和字符串去重
let arr11 = [1, 1, 2, 2, 3, 3];
let array11 = Array.from(new Set(arr11));
console.log(array11); // [1, 2, 3]
let str22 = 'aabbccddee';
let str33 = Array.from(new Set(str22)).join('');
console.log(str33); // 'abcde'

// Set 结构的实例有以下属性:

// Set.prototype.constructor：构造函数，默认就是Set函数。
// Set.prototype.size：返回Set实例的成员总数。
// Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

// 下面先介绍四个操作方法:

// add(value)：添加某个值，返回 Set 结构本身。
// delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// has(value)：返回一个布尔值，表示该值是否为Set的成员。
// clear()：清除所有成员，没有返回值。

//
// 十、Map 数据结构
const mapData = new Map();
const o = {
    p: 'Map 数据结构'
}
mapData.set(o, 'content');
console.log(mapData); // Map(1) {{…} => "content"}

// 实例方法 map.set(key, value)
/**
 * set 方法设置键名 key 对应的键值为 value，然后返回当前的 Map 数据结构，因此可以采用链式写法
 * 如果 key 已经有值，则键值会被更新，否则就新生成该键
 */
const m = new Map();
m.set('abc', 1217); // 键是字符串
m.set(3, 'aaa'); // 键是数值
m.set(undefined, 'bbb'); // 键是 undefined
console.log(m); // Map(3) {"abc" => 1217, 3 => "aaa", undefined => "bbb"}

// 链式写法
const map = new Map().set(1, 'a').set(2, 'b').set(3, 'c');
console.log(map); // Map(3) {1 => "a", 2 => "b", 3 => "c"}

/**
 * 实例方法 map.get(key)
 * get 方法读取 key 对应的键值，如果找不到 key，返回 undefined
 */
console.log(map.get(1)); // a
console.log(map.get(5)); // undefined

/**
 * 实例方法 map.has(key)
 * has 方法返回一个布尔值，表示某个键是否存在当前 Map 对象中
 */
console.log(map.has(3)); // true

/**
 * 实例方法 map.delete(key)
 * delete 方法删除某个键，返回 true，如果删除失败返回 false
 */

/**
 * 实例方法 map.clear()
 * clear 方法清除所有成员，没有返回值
 */

// Map 结构原生提供三个遍历器生成函数和一个遍历方法。

// keys()：返回键名的遍历器。
// values()：返回键值的遍历器。
// entries()：返回所有成员的遍历器。
// forEach()：遍历 Map 的所有成员。
// 需要特别注意的是，Map 的遍历顺序就是插入顺序。

for (let key of map.keys()) {
    console.log(key);
    // 1
    // 2
    // 3
}

for (let value of map.values()) {
    console.log(value);
    // a
    // b
    // c
}

for (let [key, value] of map.entries()) {
    console.log('key:' + key, 'value:' + value);
    // key:1 value:a
    // key:2 value:b
    // key:3 value:c
}
// 上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。

// map[Symbol.iterator] === map.entries
// true

for (let [key, value] of map) {
    // console.log(key, value);
    console.log('key:' + key, 'value:' + value);
}

// Map 转化为数组
// console.log([...map]);


// 十一、用 Proxy 进行预处理
// 声明 Proxy
// let pro = new Proxy({}, {});
// 注意点：
// 第一个花括号就相当于我们方法的主体
// 第二个花括号就是 Proxy 代理处理区域，相当于我们写钩子函数的地方

let objTarget = {
    add: function (val) {
        return val + 10;
    },
    name: 'JSPang'
}
let handler = {
    // get 属性：获取某对象属性值时预处理的方法，有三个参数
    // target: 获取的目标值
    // key: 目标的 key 值，相当于对象的属性
    // proxy: 实例本身(可选参数)
    get (target, key, proxy) {
        // 控制台先打印 come in Get，相当于在方法调用前的钩子函数
        // console.log('come in Get');
        // console.log(proxy,'实例本身');
        return target[key];
    },
    // set 属性：要改变 Proxy 属性值时，进行的预先处理，有四个参数
    // target: 目标值
    // key: 目标的 key 值
    // value: 要改变的值
    // receiver: 改变之前的原始值
    set (target, key, value, receiver) {
        console.log(`setting ${key} => ${value}`);
        console.log(receiver, '改变之前的原始值');
        return target[key] = value;
    },
    // apply() 方法拦截函数的调用，有三个参数
    // target: 目标对象
    // ctx: 目标对象的上下文对象(this)
    // args: 目标对象的参数数组
    apply (target, ctx, args) {
        console.log(target, '111');
        console.log(ctx, '222');
        console.log(args, '333');
        return Reflect.apply(...arguments);
    }
}
let pro = new Proxy(objTarget, handler);
console.log(pro.name); // JSPang
console.log(pro.age); // undefined
// 改变 name 的值，set 方法会预先处理
pro.name = '技术胖';
console.log(pro.name); // 技术胖
console.log(pro.add(3)); // 13

//
// 十二、Class 类操作
// 声明一个类
class Coder{ // 里面写类的方法
    name (val) { // 函数的传参
        console.log(val);
        return val;
    }
    skill (val) { // 函数的传参
        // this 代表的 Coder 实例对象
        console.log(`${this.name('技术胖')}: Skill---${val}`)
    }

    // constructor 方法---构造方法
    constructor (a, b) {
        // this 关键字代表实例对象
        this.a = a;
        this.b = b;
    }
    toString () {

    }
    add () {
        return this.a + this.b;
    }
    /**
     * 类的构造方法：constructor
     * 类除了构造方法，还定义了一个 toString 方法
     * 注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了
     * 另外，方法之间不需要逗号分隔，加了会报错。
     */
}
// 类的数据类型是函数，类本身就指向构造函数
console.log(typeof Coder); // function

// 将类实例化
let classJspang = new Coder(12, 17); // 类的传参
// classJspang.name('技术胖');
classJspang.skill('web前端');

// 类的传参
console.log(classJspang.add()); // 29

// 类的继承
class Point extends Coder {
    // 通过 extends 关键字来继承 Coder 里面的方法
    // 另外这个里面可以写 Point 自己的方法
}
let p = new Point();
p.name('类的继承 Coder 中的方法');


// 使用的时候，也是直接对类使用 new 命令，跟构造函数的用法完全一样
class Bar {
    doStuff () {
        console.log('stuff');
    }
}
let bb = new Bar();
bb.doStuff(); // 'stuff'

// class 表达式
const MyClass = class My {
    getClassName () {}
}
let inst = new MyClass();
inst.getClassName();


// 十三、模块化操作

// export: 负责进行模块化，也是模块的输出
// import: 负责把模块引入，也是模块的引入操作