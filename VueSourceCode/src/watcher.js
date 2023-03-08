/**
 * watcher.js
 *
 * 功能：
 * - 生成观察者更新视图
 * - 将观察者实例挂载到 Dep 类中
 * - 数据发生变化时，调用回调函数更新视图
 *
 * 属性：
 * - vm: vue 实例对象
 * - key: 观察的 key
 * - cb: 回调函数
 *
 * 方法：
 * - update()
 */
class Watcher {
  constructor(vm, key, cb) {
    // & 获取 vm
    this.vm = vm
    // & 获取 data 中的属性 key
    this.key = key
    // & 回调函数（更新视图的具体方法）
    this.cb = cb
    // ! 将 watcher 实例挂载到 Dep
    Dep.target = this
    // & 缓存旧值
    this.oldVal = vm[key]
    // & get 值之后，清除 Dep 中的实例
    Dep.target = null
  }
  // & 观察者中的方法，用来更新视图
  update() {
    // todo 调用 update 时获取新值
    let newVal = this.vm[this.key]
    // * 新值和旧值相同时不更新
    if (newVal === this.oldVal) return;
    // & 调用具体的更新方法
    this.cb(newVal)
  }
}

