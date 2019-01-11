// 下半部分的铅笔
import { Pencli } from './Pencli.js';
import { Sprite } from '../base/Sprite.js'
export class DownPencli extends Pencli {
  constructor(top) {
    const image = Sprite.getImage('pencilDown');
    super(image, top)
    this.top = top;
  }
  draw() {
    let gap = window.innerHeight/5;
    this.y = this.top + gap;
    super.draw();
  }
}