// 背景类
import {Sprite} from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';
// 背景类继承Sprite类
export class BackGround extends Sprite {
  constructor() {
    // 继承参数
    const image = Sprite.getImage('background');
    super(null, image,
      0,0,
      image.width, image.height,
      0,0,
      window.innerWidth, window.innerHeight);
  }

}