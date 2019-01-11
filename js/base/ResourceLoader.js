// 资源文件加载器,取保在图片资源完成后进行渲染
import {Resources} from './Resources.js'
export class ResourceLoader {
  // 初始化
  constructor() {
    // console.log('Resources:', Resources);
    this.map = new Map(Resources);
    // console.log(this.map);
    for (let [key, value] of this.map) {
      const image = wx.createImage();
      image.src = value;
      this.map.set(key,image);
    }
  }
  // 加载之后
  onloaded(calllback) {
    let loadedCount = 0;
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount ++;
        if (loadedCount >= this.map.size) {
          calllback(this.map);
        }
      }
    }
  }
  // 简单工厂模式
  static create() {
    return new ResourceLoader();
  }
}