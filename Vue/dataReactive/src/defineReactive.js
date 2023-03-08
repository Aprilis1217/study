/**
 * & defineReactive.js
 * * 使用 defineReactive 函数不需要设置临时变量，而是利用闭包
 */
import Dep from './Dep'
import observe from './observe'
export default function defineReactive(data, key, value) {
  const dep = new Dep()
  if (arguments.length === 2) value = data[key]
  console.log('我是defineReactive函数', key)
  // & 子元素进行 observe ，至此形成了递归，这个递归不是自己调用自己，而是多个函数、类循环调用
  let childOb = observe(value)

  Object.defineProperty(data, key, {
    enumerable: true, // ? 可枚举
    configurable: true, // ? 可配置
    get() {
      // ? 判断如果处于依赖收集阶段
      if (Dep.targte) {
        dep.depend() // & 添加依赖
        if (childOb) { // & 判断是否有子元素
          childOb.dep.depend() // ? 存在子元素的话，也需要添加依赖
        }
      }
      console.log(`有人访问了data对象的${key}属性`)
      return value;
    },
    set(newValue) {
      console.log(`有人变更data的属性${key}，其变更的值为：${newValue}`)
      if (value === newValue) return;
      value = newValue
      // & 设置的新值也需要被 observe
      childOb = observe(newValue)
      // & 发布订阅模式，去通知 dep
      dep.notify()
    }
  })
}

