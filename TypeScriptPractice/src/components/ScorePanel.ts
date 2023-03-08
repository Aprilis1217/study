// 定义一个记分牌的类
class ScorePanel {
  score: number;
  level: number;
  scoreElm: HTMLElement;
  levelElm: HTMLElement;
  maxLevel: number; // 最大等级
  upScore: number; // 设置一个基准分，达到后就升级
  constructor (score: number, level: number, maxLevel: number = 10, upScore: number = 20) {
    this.score = score
    this.level = level
    this.scoreElm = document.getElementById('score')!
    this.levelElm = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 记分
  addScore () {
    this.scoreElm.innerHTML = ++this.score + ''
    // 判断 score 达到 upScore 值就升级
    if (this.score % this.upScore === 0) this.upLevel()
  }
  // 等级
  upLevel () {
    if (this.level <= this.maxLevel) this.levelElm.innerHTML = ++this.level + ''
  }
  // 游戏结束，记分清 0，等级变为 1
  cleanSorcAndLevel () {
    console.log('清分')
    this.score = 0
    this.level = 1
    this.scoreElm.innerHTML = '0'
    this.levelElm.innerHTML = '1'
  }
}
// 测试代码
// const scorePanel = new ScorePanel(0, 1)
// for (let i = 0; i < 100; i++) {
//   scorePanel.addScore()
// }
export default ScorePanel;
