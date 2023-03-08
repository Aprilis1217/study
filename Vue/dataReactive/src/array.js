/**
 * & array.js
 * * 利用数组原型 Array.prototype 改写数组的 7 个方法
 */

import { def } from "./utils"

// todo 获取数组的原型，并存储
const arrayPrototype = Array.prototype

// todo 以 Array.prototype 为原型创建 arrayMethods 对象，并暴露出去
export const arrayMethods = Object.create(arrayPrototype)

// 需要被改写的 7 个数组方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  // & 拷贝数组原有的方法，数组原来的方法需要保留
  const originalMethod = arrayPrototype[methodName]
  // * 定义新的方法，且是不可枚举
  def(arrayMethods, methodName, function () {
    // ? 恢复原来的功能
    const result = originalMethod.apply(this, arguments)
    // ? 将类数组对象转为数组
    const args = [...arguments]
    console.log('类数组对象arguments=', arguments)
    console.log('args=', args)
    // & 获取到这个数组身上的 __ob__
    const ob = this.__ob__
    // todo 数组有三种方法 push unshift splice 能够插入新项，插入的新项也需要变为响应式数据，即：observe 函数处理
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        // ! splice(下标索引值, 数量, 插入的新项)
        inserted = args.slice(2) // ? 取出插入的新项
        break;
    }
    // & 判断有没有要插入的新项，让其新项也转换成响应式数据
    if (inserted.length) ob.observeArray(inserted)
    console.log(`有人变更了数组！！！只支持数组的7个方法，当前调用的数组方法名为：${methodName}，获取到的新项`, inserted)
    ob.dep.notify()
    // ! 返回 result ---> 保留了数组原有的功能
    return result;
  }, false)
})


