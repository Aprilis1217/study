// todo 泛型在定义时使用关键字 <> 简单来说就是泛指的类型

// 函数中的泛型

// 泛型在数组中的使用
function addCon<T> (param: T[]) {
  return param
}
addCon<number>([1, 2, 3])

// 定义多个泛型
function addVal<T, P> (a: T, b: P) {
  return `${a}${b}`
}
addVal<string, number>('13', 14)


// 类中的泛型

// class SelectGirl { // 没有使用泛型的类
//   constructor (private girl: string[]) {}
//   getGirl (index: number):string {
//     return this.girl[index]
//   }
// }

interface Grils { // 泛型类的继承（约束）
  name: string;
  age: number
}

class SelectGirl<T extends Grils> {
  constructor (private girl: T[]) {}
  getGirl (index: number):string {
    return `选中的女孩名字叫：${this.girl[index].name}，年龄：${this.girl[index].age}`
  }
}

const selectGirl = new SelectGirl<{name: string, age: number}>([
  {name: '小红', age: 18},
  {name: '小桃', age: 19},
  {name: '小花', age: 20}
])
console.log(selectGirl.getGirl(2))

class ChoiceBoy<T extends number | string> {
  constructor (private girl: T[]) {}
  getBoy (index: number): T {
    return this.girl[index]
  }
}

const choiceBoy = new ChoiceBoy(['张三', '李四', '王五', 11])
console.log(choiceBoy.getBoy(3))


