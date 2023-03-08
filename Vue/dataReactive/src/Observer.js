/**
 * & Observer.js
 * * Observer 类：将对象中的每个属性转换成响应式数据（递归侦测对象全部属性）
 */
import defineReactive from "./defineReactive"
import observe from "./observe"
import { def } from './utils'
import { arrayMethods } from "./array"
import Dep from "./Dep"
export default class Observer {
  constructor(value) {
    // ! 每个 Observer 的实例身上都有一个与之对应的 dep 实例
    this.dep = new Dep()
    // & 构造函数中的 this 不是类本身，而是类的实例对象
    def(value, '__ob__', this, false) // ? 给实例本身添加一个 __ob__ 属性（且是不可枚举），属性值就是这次 new 的实例
    console.log('我是 Observer 构造器', value)
    // & 判断传入的参数 value 是对象还是数组
    if (Array.isArray(value)) {
      // todo 强行改写数组的原型：将这个数字的原型指向 arrayMethods 对象上
      // ? value.__proto__ = arrayMethods 等同于下面代码
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    } else {
      // todo 调用 walk 去遍历对象的属性
      this.walk(value)
    }
  }
  // & 遍历对象 ---> 将对象中的每个属性都转换为响应式数据
  walk(value) {
    Object.keys(value).forEach(key => {
      defineReactive(value, key)
    });
  }
  // & 处理数组的响应式
  observeArray(arr) {
    // let l = arr.length // ? 放置数组在遍历时长度的变化
    // for (let i = 0; i < l; i++) {}
    console.log(arr, '处理数组的响应式')
    arr.forEach(item => {
      // & 遍历去进行 observe
      observe(item)
    })
  }
}
