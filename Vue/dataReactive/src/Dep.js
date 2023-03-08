/**
 * & Dep.js
 * * Dep 类是专门用来收集管理依赖
 * ! 每个 Observer 类的实例，成员中都有一个 Dep 类的实例
 * ? 在 getter 中收集依赖，在 setter 中触发依赖
 * todo Dep 使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的 Watcher 都通知一遍
 */
let uid = 0
export default class Dep {
  constructor() {
    this.uid = uid++
    console.log('我是 Dep 构造器')
    // & 存储观察者 ---> Watcher 的实例
    this.subs = []
  }
  // & 添加订阅
  addSub(sub) {
    // ? 判断观察者是否存在、是否拥有update且typeof为function
    if (sub && sub.update && typeof sub.update === "function") {
      this.subs.push(sub);
    }
  }
  // & 添加依赖
  depend() {
    // ! Dep.target 指定的全局的位置，全局唯一，使用 window.target 也行
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // & 发送通知
  notify() {
    console.log('我是 notify ---> 发送通知')
    // ? 拷贝一份
    const subs = this.subs.slice()
    console.log(subs, 'subs')
    // & 遍历，去触发每个观察者的更新方法 update
    if (subs.length) {
      subs.forEach(sub => {
        console.log(sub, 'sub')
        sub.update()
      })
    }
  }
}