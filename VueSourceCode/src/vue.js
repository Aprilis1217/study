/**
 * vue.js
 *
 * 属性
 * - $el: 挂载的dom对象
 * - $data: 数据
 * - $options: 传入的选项配置
 *
 * 方法：
 * - proxyData 将数据转成 getter 和 setter 形式
 */
class Vue {
  constructor(options) {
    // & 获取传入的选项配置对象，默认为空对象
    this.$options = options || {}
    // & 获取 el (#app)
    this.$el = typeof options.el === 'string' ? document.getElementById('app') : options.el
    // & 获取 data 数据，默认为空对象
    this.$data = options.data || {}
    // ! 调用 proxyData 方法处理 data 中的属性
    this.proxyData(this.$data)
    // & 使用 Observer 把 data 中的数据转为响应式，并监听数据的变化，渲染视图
    new Observer(this.$data)
    // & 编译模板，渲染视图
    new Compiler(this)

  }
  proxyData(data) {
    // & 遍历 data 对象的所有属性，进行数据劫持
    Object.keys(data).forEach(key => {
      // & 把 data 中的属性，转换成 getter 和 setter
      Object.defineProperty(this, key, {
        enumerable: true, // todo 可枚举（可遍历）
        configurable: true, // todo 可配置（可以使用 delete 删除，可以通过 defineProperty 重新定义）
        // & 获取值的时候执行
        get() {
          return data[key]
        },
        // & 设置值的时候执行
        set(newVal) {
          // & 如果新值等于旧值，则直接返回
          if (newVal === data[key]) return;
          // & 如果新值不等于旧值，则赋值
          data[key] = newVal
        }
      })
    })
  }
}