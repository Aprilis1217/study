// 联合类型
interface Waiter {
  anjiao: boolean;
  say: () => {}
}

interface HighTeacher {
  anjiao: boolean;
  skill: () => {}
}

// todo 联合类型，关键符号是 | 竖线
function judgeWho (person: Waiter | HighTeacher) {
  // judgeWho 不能准确判断联合类型具体实例是什么，因此报错
  // person.say()
  // 引出类型保护的概念
  /**
   * 1. 类型断言 关键字 as
   * 2. in 语法
   * 3. typeof 语法
   * 4. instanceof 语法 (instanceof 只能用在类上)
   */
  // todo 使用 as 可以用来告诉解析器变量的实际类型
  if (person.anjiao) {
    (person as HighTeacher).skill()
  } else {
    (person as Waiter).say()
  }

  // 使用 in
  if ('skill' in person) {
    person.skill()
  } else {
    // else 部分能够自动判断，得益于 TypeScript 的自动判断
    person.say()
  }
}

// 使用 typeof 语法
function addFn (first: number | string, second: number | string) {
  // 直接写就会报错
  // return first + second
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
}

// 使用 instanceof 语法 (只能用在类上)
class NumObj {
  count!: number; // todo 显式赋值断言 (修饰符号 !) 来帮助类型系统识别类型
}

function addObj (first: object | NumObj, second: object | NumObj) {
  if (first instanceof NumObj && second instanceof NumObj) {
    return first.count + second.count
  }
  return 0
}


// 枚举类型 enum
enum Status {
  UNSTART,
  STARTED,
  ENDED,
  CANCELED
}

function getStatus (status: any) {
  if (status === Status.UNSTART) {
    return '未开始'
  } else if (status === Status.STARTED) {
    return '已开始'
  } else if (status === Status.ENDED) {
    return '已结束'
  } else if (status === Status.CANCELED) {
    return '已取消'
  } else {
    return '未可知'
  }
}

console.log(Status.UNSTART) // 0
console.log(Status.STARTED) // 1
console.log(Status.ENDED) // 2
console.log(Status.CANCELED) // 3
// 枚举通过下标反查
console.log(`枚举通过下标反查：${Status.ENDED}---${Status[2]}`)

const result = getStatus(Status.STARTED)
console.log(`当前会议状态：${result}`)


