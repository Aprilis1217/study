/**
 * & utils.js
 * @param {*} obj 传入的 data 对象
 * @param {*} key 属性
 * @param {*} value 实例对象
 * @param {*} enumerable 是否可枚举
 * * 利用 def 函数给实例本身添加一个 __ob__ 属性（且是不可枚举），属性值就是这次 new 的实例
 */
export const def = (obj, key, value, enumerable) => {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}