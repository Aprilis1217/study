/**
 * TypeScript 是什么？
 * 是由微软开发的自由和开源的编程语言
 * 是 JavaScript 的一个超集，在它的基础上添加了可选的静态类型和基于类的面向对象编程
 */

// todo TypeScript 与 JavaScript 两者特性对比
/**
 * TypeScript 是一个应用程序级的 JavaScript 开发语言
 * TypeScript 是 JavaScript 的超集，可以编译成纯JavaScript，类似于 css 与 less sass 之间的关系
 * TypeScript 提供了类、模块和接口，更易于构建组件和维护
 */

// todo typescript 基础静态类型和对象类型
/**
 * 在 TypeScript 静态类型分为两种：
 * 基础静态类型
 * 对象类型
 */

// 常见的基础静态类型：string, undefined, null, number, boolean, symbol, void, any


// todo unknown 未知类型，实际上是一个类型安全的 any，unknown 类型变量不能直接赋值给其他变量
let age: number = 21 // 数字类型
let myName: string = 'fengyi' // 字符串类型

let n1: null = null
let u1: undefined = undefined
// -------------------------------
// let n2: null = undefined
// let u2: undefined = null
// todo 定义为 null 或 undefined 类型的变量，赋值可以为 null 和 undefined 其中之一

// 布尔值类型
let bol: boolean = true

// todo 声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null
let unusable: void = undefined;
// void 类型 ===> 用于表示返回空
function fn (): void {
  console.log('This is a fn, but return is void')
}
fn()

// any 类型 ===> 可以赋值任意类型的值，不建议使用。
// 第三方代码库或用户自己输入时，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，可以使用 any
let any1: any = 'xxx'
// 当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据
let list: any[] = ['111', 222, true]

// todo never 类型，表示那些永远不存在的值的类型
// function throwFn (): never {
//   throw new Error('never 类型，表示那些永远不存在的值的类型')
// }
// throwFn()


// 对象类型
const obj: {
  name: string,
  age: number
} = {
  name: 'yangliu',
  age: 18
}

// 数组
const arrStr: string[] = ['1', '2', '3']
const arrNum: number[] = [1, 2, 3]
const arr: (string|number)[] = [1, '1', 2, '2']
// 数组对象定义
// todo type alias 类型别名
type objInfo1 = { // todo 通过 type 关键字 objectInfo 类别名
  name: string,
  age: number
}
// class objInfo2 { // todo 也可以通过 class 类
//   name: string;
//   age: number;
// }
const arrObj1: objInfo1[] = [
  {name: '小明', age: 18},
  {name: '小张', age: 19},
  {name: '小王', age: 20}
]
// const arrObj2: objInfo2[] = [
//   {name: '小明', age: 18},
//   {name: '小张', age: 19},
//   {name: '小王', age: 20}
// ]

// todo 元组：把数组中每一个元素固定类型
const teacherInfo: [string, string, number] = ['Dell', 'English', 38]
const teacherList: [string, string, number][] = [
  ['Jack', '杰克', 21],
  ['Rols', '露丝', 18]
]

// class 类
class Person {}
const malaji: Person = new Person()

// 函数
const hulala: ()=>string = () => '呼啦啦' // hulala 必须是个函数且返回字符串
const birthday: ()=>number = () => 1128 // count 必须是个函数且返回数字

// todo 对象类型：对象类型、数组类型、类类型、函数类型


// todo TypeScript 中的 类型注解 和 类型推断
// 类型注解 type annotation
let count: number;
count = 1226

// 类型推断 type inferrence
let countInferrence = 666

const one = 1
const two = 2
const three = one + two // TS 能自己推断出变量类型

function getTotal (a:number, b:number) {
  return a + b
}
const total = getTotal(1, 2) // TS 推断不出变量 total 是什么类型，就需要写注解

const personObj = { // TS 也能推断出对象中属性的类型
  name: '麻辣鸡',
  age: 21
}

// todo 工作中使用原则：
// 如果 TS 能自动分析变量类型，啥也不需要做
// 如果 TS 无法分析变量类型，就需要使用类型注解
// 在写 TS 代码的一个重要宗旨就是每个变量，每个对象的属性类型都应该是固定的，假如能推断类型就推断，不能的话就需要写注解

// 函数参数和返回类型的注解
const sayHello = (): void => { // void 类型 ===> 用于表示返回空
  // todo 函数无返回值时定义方法 ===> void
  console.log('Hello World')
}
sayHello()

// never 返回值类型
const errorFn = (): never =>{
  throw new Error('如果一个函数是永远也执行不完的，就可以定义返回值为 never')
}

// const forNever = (): never => {
//   while (true) {}
// }

// 函数参数为对象(解构)时
const addCount = ({a, b}: {a: number, b: number}) => {
  return a + b
}
addCount({a: 11, b: 22})

// Interface 接口
interface Girl {
  name: string,
  age: number,
  bust: number,
  waistline?: number, // todo 接口非必选值的定义，就是在 : 的前面加个 ? 可选属性
  [propname:string]: any, // todo 属性的名字是字符串，属性的值是任意值
  // 接口里的方法
  say(): string // 方法必须返回字符串
}

// 接口间的继承
interface Teacher extends Girl { // 接口 Teacher 继承了 Girl 接口
  teach(): string
}

// const screenResume = (name: string, age: number, bust: number):void => {
const screenResume = (girl: Girl):void => {
  girl.age < 21 && girl.bust >= 90 && console.log(girl.name + '进入面试')
  girl.age >= 21 || girl.bust < 90 && console.log(girl.name + '你被淘汰了！')
}
// const getResume = (name: string, age: number, bust: number):void => {
const getResume = (girl: Teacher):void => {
  console.log(girl.name + '年龄是：' + girl.age)
  console.log(girl.name + '胸围是：' + girl.bust)
  girl.waistline && console.log(girl.name + '腰围是：' + girl.waistline)
  console.log(girl.teach())
}
// 把上面两个重复的类型注解，定义成同一的接口
// todo 接口和类型别名的区别：
// 类型别名可以直接给类型，而接口必须代表对象

let girl = {
  name: '花花',
  age: 21,
  bust: 96,
  waistline: 25,
  sex: '女',
  say () {
    return '这是一个方法，返回的是字符串'
  },
  teach () {
    return '接口之间的继承'
  }
}
screenResume(girl)
getResume(girl)

// 接口和类的约束
class XiaoJieJie implements Girl {
  name = '桃桃'
  age = 18
  bust = 95
  say () {
    return '麻辣鸡'
  }
}

// todo 类的基本使用
class Lady {
  content = '乌拉西'
  say () {
    return this.content
  }
}
// 类的继承
class XiaoJie extends Lady {
  // 重写 say 方法
  // say () {
  //   return 'Xiaojie继承了Lady的方法，并且重写了 say 方法'
  // }
  // todo 可以利用 super 关键字来调用父类的方法
  say () {
    console.log(super.content) // undefined
    console.log(this.content) // 乌拉西
    return super.say() + '呼啦啦'
  }
  sayHello () {
    return 'Hi, 帅哥！'
  }
}
const Goddess = new XiaoJie()
console.log(Goddess.sayHello())
console.log(Goddess.say())
