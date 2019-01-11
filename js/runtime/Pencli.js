// 铅笔基类
import { Sprite } from '../base/Sprite.js'
// import { Director } from '../Director.js';
export class Pencli extends Sprite{
  constructor(image, top) {
    super(null,image,
    0,0,
    image.width, image.height,
    // 刚好在右侧看不到的位置
    window.innerWidth, 0,
    // 铅笔的宽高
    image.width, image.height
    )
  }
  draw() {
    this.x = this.x - 2;
    super.draw(this.img, 
    0,0,
      this.img.width, this.img.height,
    this.x, this.y,
      this.img.width, this.img.height);
  }
}