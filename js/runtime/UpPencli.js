// 上半部分的铅笔
import {Pencli} from './Pencli.js';
import {Sprite} from '../base/Sprite.js'

export class UpPencli extends Pencli{
  constructor(top){
    const image = Sprite.getImage('pencilUp');
    // console.log('image----:', image);
    super(image, top)
    this.top = top;
  }
  draw() {
    this.y = this.top - this.height;
    // console.log('top--------', this.top);
    // console.log('height--------', this.height);
    // console.log('y--------', this.y);
    super.draw();
  }
}