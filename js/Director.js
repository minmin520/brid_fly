// 导演类，单例。控制游戏的逻辑
import { DataStore } from './base/DataStore.js';
import { UpPencli } from './runtime/UpPencli.js';
import { DownPencli } from './runtime/DownPencli.js';

export class Director {
  constructor() {
     this.dataStore = DataStore.getInstance();
     this.landSpeed = 2;
  }
  // 单例模式
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }
  // 创建铅笔
  createPencli() {
    const minTop = window.innerHeight / 8;
    const maxTop = window.innerHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    // console.log('top哈哈：', top);
    this.dataStore.get('penclis').push(new UpPencli(top));
    this.dataStore.get('penclis').push(new DownPencli(top));

  }
  // 触摸之后让小鸟飞起来
  birdsEvent() {
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] =
        this.dataStore.get('birds').birdsY[i];
    }
    this.dataStore.get('birds').time = 0;
  }
  // 判断小鸟是否和铅笔撞击
  isStrike(bird, pencli){
    // 撞击
    let s = false;
    // 小鸟的高度>铅笔的底部
    // 小鸟的底部<铅笔的高度
    // 小鸟的右侧<铅笔的左侧
    // 小鸟的左侧>铅笔的右侧
    if (bird.top >pencli.bottom||
    bird.bottom < pencli.top ||
    bird.right < pencli.left ||
    bird.left > pencli.right) {
      s = true;
    }
    return !s;
  }

  // 判断小鸟是否撞击地板和铅笔
  check() {
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const penclis = this.dataStore.get('penclis');
    const score = this.dataStore.get('score');
    // 地板的撞击判断
    if (birds.birdsY[0]+birds.birdsHeight[0] >= land.y) {
      console.log('撞击地板啦');
      this.isGameOver = true;
      return;
    }
    // 小鸟的边框模型
    const birdsBorder = {
      // 位置
      top: birds.y[0],
      // 位置+高度
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      // 位置
      left: birds.birdsX[0],
      // 位置+宽度
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }
    // 铅笔的边框模型
    const length = penclis.length;
    
    for (let i = 0; i <length;i++) {
      const pencli = penclis[0];
      const pencliBorder = {
        top:pencli.y,
        bottom: pencli.y + pencli.height,
        left:pencli.x,
        right: pencli.x +pencli.width
      }
      if (Director.getInstance().isStrike(birdsBorder, pencliBorder)) {
        console.log('撞到水管了');
        this.isGameOver = true;
        return;
      }
    }
    // 加分逻辑
    if (birds.birdsX[0] > penclis[0].x + penclis[0].width &&
      score.isScore) {
      score.isScore = false;
      score.scoreNumber ++;
    }

  }
  // 导演类的运行方法
  run(){
    // 
    this.check();
    if (!this.isGameOver) {
      this.dataStore.get('background').draw();
      const penclis = this.dataStore.get('penclis');
      // 如果第一支铅笔的左侧距离加第一支铅笔的宽度<0, 并且铅笔的总数等于4，让第一对铅笔出去，剩下第二对铅笔
      if (penclis[0].x + penclis[0].width <= 0 && penclis.length === 4) {
        penclis.shift();
        penclis.shift();
        this.dataStore.get('score').isScore = true;
      }
      // 如果第一支铅笔
      if (penclis[0].x <= (window.innerWidth - penclis[0].width) / 2 && penclis.length === 2) {
        this.createPencli();
      }
      this.dataStore.get('penclis').forEach(function (value) {
        value.draw();
      });
      this.dataStore.get('land').draw();
      this.dataStore.get('birds').draw();
      this.dataStore.get('score').draw();
      // requestAnimationFrame一般用于动画
      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);
    } else {
      // console.log('游戏结束');
      this.dataStore.get('startButton').draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destory();
    }
  }

}