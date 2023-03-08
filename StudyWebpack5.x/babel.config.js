module.exports = {
  // 智能预设：能够编译简单的 es6 的语法
  // 但是像 async 函数、promise 对象、数组的一些方法（includes）等没办法处理
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage', // todo 使用 corejs 的方式 usage 表示按需加载
      corejs: {
        version: "3", // 指定 corejs 版本
        proposals: true
      }
    }]
  ]
}



