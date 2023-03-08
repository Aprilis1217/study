/**
 * & observe.js
 * * 判断传入的参数是不是对象
 * * 判断传入的参数有没有 __ob__ 属性，没有的话就 new Observer()
 */

import Observer from "./Observer";
export default function (value) {
  // ? 判断参数 value 是否是对象，若不是对象直接返回
  if (typeof value !== 'object') return;
  // & 定义 ob 用来存储 Observer类的实例
  let ob;
  // * 判断传入的参数 value 身上有没有 __ob__(其实就是 Observer 类的实例)
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob;
}