// 精灵的基类
import {DataStore} from './DataStore.js';
export class Sprite {
  constructor(ctx = null,
              img = null,
              srcX = 0,
              srcY = 0,
              srcW = 0,
              srcH = 0,
              x = 0, y = 0,
              width = 0, height = 0) {
    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
    // 有这些参数            
    // this.ctx = ctx;
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  // 画图
  draw(img = this.img,
      srcX = this.srcX,
      srcY = this.srcY,
      srcW = this.srcW,
      srcH = this.srcH,
      x = this.x,
      y = this.y,
      width = this.width,
      height = this.height) {
    // console.log('this.ctx:', this.ctx);
    // console.log('img:', img, srcX, srcY, srcW, srcH, x, y, width, height);
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    );
  }
  static getImage(key){
    return DataStore.getInstance().res.get(key);
  }
}