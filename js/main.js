// 初始化整个游戏的精灵，作为游戏的入口
import { ResourceLoader } from "./base/ResourceLoader.js";
import { Director } from "./Director.js";
import { BackGround } from './runtime/BackGround.js';
import { Land } from './runtime/Land.js';
import { Birds } from './player/Birds.js';
import { StartButton } from './player/StartButton.js';
import { Score } from './player/Score.js';
import { DataStore } from './base/DataStore.js';


export class Main {
  // 构造函数
  constructor() {
    // 创建画布
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    // 获取dataStore的实例
    this.dataStore = DataStore.getInstance();
    // 获取ResourceLoader的实例
    const loader = ResourceLoader.create();

    this.director = Director.getInstance();
    // 将resource中的map load过来
    loader.onloaded(map => this.onResourceFirstLoaded(map));
  }
  // 第一次加载资源
  onResourceFirstLoaded(map) {
    // 将画布和map存到dataStore的res变量中
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    // 初始化
    this.init();
  }
  // 初始化
  init() {
    // 首选重置游戏是没有结束的
    this.director.isGameOver = false;

    // 将背景实例存在dataStore中
    this.dataStore
    .put('background',BackGround)
    .put('land', Land)
    .put('penclis', [])
    .put('birds', Birds)
    .put('startButton', StartButton)
    .put('score', Score);
    this.registerEvent();
    this.director.createPencli();

    // 让导演类执行run方法
    this.director.run();
  }
  registerEvent() {
    
    wx.onTouchStart(()=>{
      console.log('触摸了');
      if (this.director.isGameOver) {
        // console.log('游戏结束了');
        this.init();
      } else {
        this.director.birdsEvent();
      }
    }); 
  }
}