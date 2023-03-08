// 定义一个 Food 类
class Food {
  elm: HTMLElement;
  constructor () {
    // 感叹号! : 肯定获取的元素不可能为空，就不用进行空值判断
    this.elm = document.getElementById('food')!
  }
  // 获取 X 横坐标位置
  get X() {
    return this.elm.offsetLeft;
  }
  // 获取 Y 纵坐标位置
  get Y() {
    return this.elm.offsetTop;
  }
  // 随机生成 food 的位置
  randomChange () {
    // 实物最小的位置 0 最大位置 290
    // 蛇一次只移动一格，一格的大小是 10，所以要求失误随机生成的位置是整 10 的
    // round 向上取整 floor 向下取整
    let randomX = Math.floor(Math.random() * 30) * 10
    let randomY = Math.floor(Math.random() * 30) * 10
    this.elm.style.left = randomX + 'px'
    this.elm.style.top = randomY + 'px'
  }
}
// 测试代码
// const food = new Food()
// food.randomChange()
export default Food;
