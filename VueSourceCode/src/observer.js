/**
 * observer.js
 *
 * 功能
 * - 把 $data 中的属性，转换成响应式数据
 * - 如果 $data 中的某个属性也是对象，则把该属性转换成响应式数据（利用递归）
 * - 数据变化时，发送通知
 *
 * 方法：
 * - walk(data): 遍历 data 属性，调用 defineReactive 将数据转换成 getter/setter
 * - defineReactive(data, key, value): 将数据转换成 getter/setter
 */
class Observer {
  constructor(data) {
    this.walk(data)
  }
  // & 遍历 data 中的属性，转化成响应式
  walk(data) {
    // & 判断如果 data 是空或者不是对象，则直接返回
    if (!data || typeof data !== 'object') return;
    // & 遍历 data 中的属性，转化成响应式
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  // ? 数组的特殊处理
  observeArray(arr) {
    let l = arr.length;
    for (let i = 0; i < l; i++) {
      console.log(arr[i])
    }
  }

  // & 将 data 中的属性转为 getter/setter
  defineReactive(data, key, value) {
    // ! 检测属性值是否是对象，是对象的话，继续将对象转为响应式
    this.walk(value)
    // & 保存 this
    const that = this
    // & 创建一个 Dep 对象，给每个属性添加对应的观察者
    const dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // ! 添加观察者对象 (Dep.target)
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newVal) {
        if (newVal === value) return;
        // & 如果新值不等于旧值则赋值，此处形成了闭包，延长了 value 的作用域
        value = newVal
        // & 赋值后检查属性值是否是对象，是对象的话则将属性转化成响应式
        that.walk(newVal)
        // & 数据变化后发送通知，触发 watcher 中的 update 方法更新数据
        dep.notify()
      }
    })
  }
}
