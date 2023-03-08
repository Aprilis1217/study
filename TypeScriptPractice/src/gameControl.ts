// 引入模块
import Snake from "./components/Snake"
import Food from "./components/Food"
import ScorePanel from "./components/ScorePanel"
import Direction from "./directionEnum";
// 游戏控制器对象
class GameControl {
  private snake: Snake;
  private food: Food;
  private scorePanel: ScorePanel;
  // 创建一个属性来存储蛇的移动方向
  private direction: string = "";

  // 记录游戏是否结束
  private isLive: boolean = true;

  constructor () {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(0, 1)
    this.initGame()
  }
  // 初始化游戏的方法
  private initGame () {
    document.addEventListener('keydown', (e) => {
      this.keydownHanler(e)
    })
    this.run()
  }
  // 键盘按键的响应事件
  private keydownHanler (event: KeyboardEvent) {
    console.log(event, '键盘按键的响应事件')
    this.direction = event.key;
  }
  // 判断蛇是否吃到了食物
  private checkEat () {
    if (this.snake.X === this.food.X && this.snake.Y === this.food.Y) {
      // 吃到食物需要重置食物的位置
      this.food.randomChange()
      // 分数增加
      this.scorePanel.addScore()
      // 蛇的身体增加一节
      this.snake.addSnakeBody()
    }
  }
  // 蛇移动的方法
  private run () {
    /**
   * 根据方向 this.direction 来使蛇的位置改变
   *    向上：top减少
   *    向下：top增加
   *    向左：left减少
   *    向右：left增加
   */
    // 获取蛇现在的横纵坐标
    let X :number = this.snake.X
    let Y :number = this.snake.Y
    switch(this.direction) {
      case Direction.UP:
        Y -= 10
        break;
      case Direction.DOWN:
        Y += 10
        break;
      case Direction.LEFT:
        X -= 10
        break;
      case Direction.RIGHT:
        X += 10
    }
    try {
      // 设置蛇头的横纵坐标
      this.snake.X = X;
      this.snake.Y = Y;
      this.checkEat()
    } catch(error: any) {
      // 蛇挂球了
      this.isLive = false
      alert(error.message)
      this.scorePanel.cleanSorcAndLevel()
      this.snake.removeHeadBody()
    }
    if (this.isLive) {
      setTimeout(() => {
        this.run()
      }, 300 - (this.scorePanel.level - 1) * 30)
    }
  }
}
console.log(GameControl, 'GameControl')
export default GameControl
