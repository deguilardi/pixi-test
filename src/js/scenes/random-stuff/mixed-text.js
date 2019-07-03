import * as PIXI from 'pixi.js'

export default class MixedText extends PIXI.Container {
  constructor(elements) {
    super()
    this.elements = elements
    this.totalWidth = 0
    this.setupUI()
  }

  setupUI(){
    var offset = 15
    var self = this
    this.elements.forEach(function(element){
        element.x = self.totalWidth
        element.anchor.set(0, 0.5)
        self.totalWidth += element.width + offset
        self.addChild(element)
    });
  }
}