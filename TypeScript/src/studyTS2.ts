// todo 类的访问类型
// public 不声明默认都为 public，也可以显示的设置为 public，公共的，外部内部都可以访问
// private 私有的，只允许在类的内部访问，外部不允许调用
// protected 允许在类的内部访问或者是继承的子类中访问
// readonly 设置属性为只读，必须在声明时或构造函数里初始化

class Animal {
  // name: string; // 默认是公共的
  // private age: number; // 私有的
  constructor (public name: string, private age: number) { // 构造函数
    this.name = name
    this.age = age
  }
  public sayHello (): void { // 公共的
    console.log('公共的方法：public', this.name)
  }
  // protected 成员可以在派生类中访问（能被继承，但不能在实例中访问，若构造函数是protected，则不能被实例化，只能被继承）
  protected skinColour (color: string = 'black'): void { // 被保护的
    console.log(`${this.name} skin colour is ${color}`)
  }
}
// todo 继承使用关键字extends，调用父类使用super，子类继承父类的属性和方法，并且子类可以改写父类的属性和方法

class Hourse extends Animal {
  constructor (name: string, age: number) {
    super(name, age)
  }
  // 子类继承能重写父类的属性和方法
  public sayHello(): void {
    console.log(`I am a ${this.name}`)
    // console.log(`我已经${this.age}`) // todo 子类中访问父类的私有属性报错
    // 子类继承能调用父类中被保护的属性和方法，无法调用父类私有的属性和方法
    super.skinColour('brown')
  }
}
const animal = new Animal('dog', 5)
const hourse = new Hourse('hourse', 3)
hourse.sayHello()
console.log(hourse instanceof Animal) // true

// readonly 属性为只读，不能修改
class People {
  // readonly name: string;
  // todo 参数属性（参数属性通过给构造函数参数添加一个访问限定符来声明（public,private,protected）,把声明和赋值合并至一处）
  constructor (readonly name: string, private age: number) {
    this.name = name
  }
  sayHello () {
    console.log(`我的名字叫${this.name}，我${this.age}岁了`)
  }
}
const people = new People('小明', 18)
// people.name = '小花' // error: Cannot assign to 'name' because it is a constant or a read-only property.
people.sayHello() // 我的名字叫小明，我18岁了


// todo 存取器，get 和 set; 只带 get 不带 set 的存取器自动推断为 readonly
let passcode = 'secret passcode'
class Employee {
  static height: number = 666; // todo 静态属性 static 不能被实例访问，在类里面访问，需要加上类名
  private _fullName: string;
  constructor (_fullName: string) {
    this._fullName = _fullName
  }
  get fullName (): string {
    return this._fullName
    // return '乌拉西'
  }
  set fullName (newName: string) {
    if (passcode && passcode === 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
  sayHello (): void {
    console.log(`static 静态属性访问需要加上类名Employee.height===`, Employee.height)
  }
}
const employee = new Employee('乌拉西')
employee.fullName = 'Bob Smith'
if (employee.fullName) console.log(employee.fullName)
employee.sayHello()


// todo abstract 抽象类做为其它派生类的基类使用，它们一般不会直接被实例化。抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
abstract class Person1 {
  constructor (public name: string) {
    this.name = name
  }
  abstract sayHello (): void;
}

class Employee1 extends Person1 {
  constructor () {
    super('抽象类')
  }
  sayHello(): void {
    console.log(`This is a ${this.name}`)
  }
}
// let person1 = new Person1('乌拉西') // todo 抽象类的实例无法创建
const employee1 = new Employee1()
employee1.sayHello()
