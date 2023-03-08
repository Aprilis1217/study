import Direction from "../directionEnum";
class Snake {
  // 蛇的容器元素
  snakeContent: HTMLElement;
  // 蛇头的元素
  snakeHead: HTMLElement;
  // 蛇身体的元素
  snakeBodies: HTMLCollection;

  constructor () {
    this.snakeContent = document.getElementById('snake') as HTMLElement
    this.snakeHead = document.querySelector('#snake > div') as HTMLElement
    console.log(this.snakeContent, '蛇的容器')
    this.snakeBodies = this.snakeContent.getElementsByTagName('div')
    console.log(this.snakeBodies, '蛇的身体')
  }

  // 获取蛇头的 X 坐标
  get X() {
    return this.snakeHead.offsetLeft;
  }
  // 获取蛇头的 Y 坐标
  get Y() {
    return this.snakeHead.offsetTop;
  }
  // 设置蛇头的 X 坐标
  set X(val: number) {
    // X的值的合法范围在0-290px之间
    if (val < 0 || val > 290) {
      // 进入判断，说明蛇撞墙了
      throw new Error("蛇撞墙了");
    }
    // 避免蛇在两节及以上的时候发生掉头的问题
    if (this.snakeBodies[1] &&
      (this.snakeBodies[1] as HTMLElement).offsetTop === val) {
      if (val > this.X) {
        val = this.X - 10;
      } else {
        val = this.X + 10;
      }
    }
    // 如果新值和旧值相等，则直接返回不修改
    if (this.X === val) return;
    // 移动蛇的身体
    this.moveSnakeBody()
    // 移动蛇头
    this.snakeHead.style.left = val + 'px'
    this.checkHeadBody()
  }
  // 设置蛇头的 Y 坐标
  set Y(val: number) {
    // X的值的合法范围在0-290px之间
    if (val < 0 || val > 290) {
      // 进入判断，说明蛇撞墙了
      throw new Error("蛇撞墙了");
    }
    // 如果新值和旧值相等，则直接返回不修改
    if (this.Y === val) return;
    // 避免蛇在两节及以上的时候发生掉头的问题
    if (this.snakeBodies[1] &&
      (this.snakeBodies[1] as HTMLElement).offsetTop === val) {
      if (val > this.Y) {
        val = this.Y - 10;
      } else {
        val = this.Y + 10;
      }
    }
    // 移动蛇的身体
    this.moveSnakeBody()
    // 移动蛇头
    this.snakeHead.style.top = val + 'px'
    this.checkHeadBody()
  }
  // 蛇增加身体的方法
  addSnakeBody () {
    let div: HTMLElement = document.createElement('div')
    this.snakeContent.appendChild(div)
    console.log(this.snakeContent, '蛇的身体')
  }
  // 蛇身体移动的方法
  private moveSnakeBody () {
    // 将后边的身体设置为前边身体的位置
    for (let i = this.snakeBodies.length - 1; i > 0; i--) {
      let X :number = (this.snakeBodies[i - 1] as HTMLElement).offsetLeft;
      let Y: number = (this.snakeBodies[i - 1] as HTMLElement).offsetTop;
      // 将值设置到当前身体上
      (this.snakeBodies[i] as HTMLElement).style.left = X + 'px';
      (this.snakeBodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  // 判断蛇头是否撞到蛇身
  private checkHeadBody () {
    // 获取所有的身体，检查是否和蛇头的坐标发生重叠
    for (let i = 0; i < this.snakeBodies.length; i ++) {
      let node = this.snakeBodies[i] as HTMLElement;
      // if (this.X === node.offsetLeft && this.Y === node.offsetTop) {
      //   // 进入判断说明蛇头撞到了身体，游戏结束
      //   throw new Error('蛇头撞到身体，游戏结束！！！')
      // }
    }
  }
  // 移除掉除蛇头外的其余的 div
  removeHeadBody () {
    if (this.snakeBodies.length) {
      // (this.snakeContent as HTMLElement).parentNode.removeChild()
      this.snakeContent.innerHTML = ''
      let div = document.createElement('div')
      this.snakeContent.appendChild(div)
    }
  }
}


export default Snake;
