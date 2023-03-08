(() => {
  // 使用 class 关键字定义一个类 (对象)
  /**
   * 对象中主要包含两个部分：
   *    属性
   *    方法
   */
  class Person {
    /**
     * 直接定义的属性是实例属性和方法，需要通过对象的实例去访问
     *    const person = new Person()
     *    person.name
     *    person.sayHello()
     *
     * 使用 static 开头的属性是静态属性（类属性），可以通过类 Person.name 去访问
     * 使用 static 开头的方法是静态方法（类方法），可以通过类 Person.sayHi() 去访问
     *
     * readonly 只读属性，不能修改
     */
    name: string;
    age: number;
    static readonly sex: string = '女'; // todo 在属性前面使用 static 关键可以定义类的静态属性（类属性）

    // 构造函数
    constructor (name: string, age: number) {
      this.name = name
      this.age = age
    }
    static sayHi () {
      console.log('静态方法')
    }
    sayHello () {
      console.log(`小妹妹名字叫${this.name}，${this.age}岁`)
    }
  }
  const person = new Person('小花', 18) // 创建一个实例对象
  console.log(person)
  // todo 能通过实例对象访问的属性称为实例属性
  // todo 能通过实例对象访问的方法称为实例方法
  console.log(person.name)
  person.sayHello()
  // 类的静态属性和静态方法只能通过自身去调用
  console.log(Person.sex)
  // Person.sex = '男' readonly 只读属性，不能修改
  // console.log(Person.sex)
  Person.sayHi()


  /**
   * 抽象类：关键字 abstract
   * 和其他类区别不大，只是不能用来创建对象（实例化成对象）
   * 抽象类不能被实例化成对象，一般是用来被继承的类
   */
  abstract class Animal { // 父类
    name: string;
    age: number;
    // todo 构造函数，在创建实例对象的时候被调用，也就是 new 的时候
    constructor (name: string, age: number) {
      // todo 在构造函数中，this 代表当前创建的对象
      console.log('构造函数中', this)
      this.name = name
      this.age = age
    }
    sayCall (): void {
      // todo 在普通方法中，谁调用该方法，this 就指向谁
      console.log('普通方法中', this)
      if (this.name === '阅兵') {
        console.log(`${this.name}---汪汪汪`)
      } else if (this.name === '年糕') {
        console.log(`${this.name}---喵喵喵`)
      } else {
        console.log('其它小动物')
      }
    }
    // todo 抽象方法只能在抽象类中定义，没有方法体，子类必须对抽象方法进行重写
    abstract sayHello():void; // 定义一个抽象方法
  }

  class Dog extends Animal { // 子类
    sayHello(): void {
      console.log('Dog 重写父类中的处向方法')
    }
    run (): void {
      console.log(`${this.name}想让阿柳带它出去溜达`)
    }
    sayCall(): void { // 子类可以重写父类中的方法
      console.log('Dog 子类重写父类的 sayCall 方法')
    }
  }

  class Cat extends Animal { // 子类
    category: string;
    constructor (name: string, age: number, category: string) {
      // todo 如果在子类中也写了 constructor 构造函数，那么子类中必须使用 super 关键字调用父类的构造函数
      super(name, age) // 这就是调用父类的构造函数
      this.category = category
    }
    sayHello(): void {
      console.log('Cat 重写父类中的处向方法')
    }
    doSomething (): void {
      console.log(`${this.name}是${this.category}，它正在睡觉`)
    }
  }

  const dog = new Dog('阅兵', 6)
  const cat = new Cat('年糕', 3, '银渐层')
  dog.sayCall()
  dog.run()
  cat.sayCall()
  cat.doSomething()


  type myType = {
    name: string,
    age: number
  }
  // todo 定义一个接口，关键字 interface
  // 接口用来定义一个类的结构，其实就是定义一个规范，限制
  interface myInter {
    name: string;
    age: number;
    fn():void;
  }
  const myObj1: myType = {
    name: 'myObj1',
    age: 111
  }
  console.log(myObj1, 'myObj1')
  const myObj2: myInter = {
    name: 'myObj2',
    age: 222,
    fn: () => {}
  }
  console.log(myObj2, 'myObj2')

  // todo 定义一个接口，关键字 interface
  // 接口用来定义一个类的结构，接口可以重复声明
  interface myInter {
    name: string;
    age: number;
    fn():void;
  }
  /**
   * 接口中所有的属性不能有实际的值
   * 接口只定义对象的接口，而不考虑实际值
   * 在接口中所有的方法都是抽象方法
   */
  class myClass implements myInter {
    name: string;
    age: number;
    constructor (name: string, age: number) {
      this.name = name
      this.age = age
    }
    fn (): void {
      console.log('')
    }
  }
  console.log(myClass, 'myClass')

  // todo TS 可以再属性前添加修饰符
  /**
   * public 公共的，可以在任意位置访问（修改）默认值
   * private 私有的，只能在类的内部进行访问（修改）// todo 通过在类中添加方法使得私有属性能被外部访问（修改）
   * protected 受保护的，只能在当前类的内部或者当前类的子类中访问（修改）
   */
  class A {
    // aaa: string;
    // protected bbb: string;
    // private _name: string;
    // private _age: number;
    // constructor (name: string, age: number) {
    //   this._name = name;
    //   this._age = age;
    // }
    // todo 简写等同于上面的写法
    constructor (private _name: string, private _age: number, aaa: string, protected bbb: string){}
    /**
     * getter 方法用来读取属性
     * setter 方法用来设置属性
     * getter 和 setter 被称为属性存取器
     */

    get name() {
      return this._name
    }
    set name(val) {
      this._name = val
    }
    get age() {
      return this._age
    }
    set age(val) {
      this._age = val
    }
  }
  const aa = new A('小A', 18, 'aaa', 'bbb')
  console.log(aa.name) // 实际上是调用了 类A get 方法
  aa.name = '呼啦啦' // 实际上是调用了 类A 的 set 方法
  console.log(aa.name)

  class B extends A { // B类继承A类
    test () {
      // 子类能够访问到父类中受保护的属性
      console.log(this.bbb)
      // console.log(this._name) // 报错，子类不能访问到父类中私有属性
    }
  }
  const bb = new B('小B', 19, '麻辣鸡', '乌拉西')
  console.log(bb)
})()
