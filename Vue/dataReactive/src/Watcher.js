/**
 * & Watcher.js
 * * Watcher 类是一个中介，数据发生变化时通过 Watcher 中转，通知组件
 * todo 依赖就是 Watcher。只有 Watcher 触发的 getter 才会收集依赖，哪个 Watcher 触发了 getter，就把哪个 Watcher 收集到 Dep 中
 */
let uid = 0
export default class Watcher {
  constructor(target, expression, callback) {
    console.log('我是 Watcher 构造器')
    this.uid = uid++
    this.target = target
    this.getter = parsetPath(expression)
    this.callback = callback
    this.value = this.get()
  }
  // & 观察者中的方法，用来更新视图
  update() {
    console.log('用 update 时获取新值')
    this.run()
  }
  get() {
    // & 进入依赖收集阶段，让全局的 Dep.target 设置为 Watcher 本身
    Dep.target = this
    // * 获取 obj 对象
    const obj = this.target;
    let value;
    // ? 使用 try catch 来捕捉错误，只要能找到的 obj 就会一直找
    try {
      value = this.getter(obj)
    } finally {
      Dep.target = null
    }
    return value;
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb) {
    const value = this.get()
    if (value !== this.value || typeof value == 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }
}

function parsePath(str) {
  let segments = str.split('.')
  return (obj) => {
    segments.forEach(item => {
      if (!obj) return;
      obj = obj[item]
    });
    return obj;
  }
}

