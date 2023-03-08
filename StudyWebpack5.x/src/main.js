import { count } from './count'

// 引入 css 样式
import '@/assets/css/index.css'
// 引入 less 样式
import '@/assets/css/index.less'
// 引入字体图标
import '@/assets/fonts/iconfont.css'

console.log(count(5, 2))

document.getElementById('btn').onclick = () => {
  // /* webpackChunkName: "add" */ ---> webpack 动态导入模块命名的方式（魔法命名）
  // "add" 将来就会作为 [name] 的值显示
  // todo 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import(/* webpackChunkName: "add" */ './add.js').then(({add}) => {
    console.log(add(6, 0))
  })
}

const promise = new Promise((reslove) => {
  setTimeout(() => {
    console.log('执行了 Promise 中的定时器')
    reslove()
  })
})

console.log(promise, 'Promise')


