import * as PIXI from 'pixi.js'
import MixedText from './mixed-text.js'

const words = ["money", "heart", "project", "softgames", "pixijs"]
const emojis = ["angel", "eyes", "normal", "tongue", "upside-down"]

export default class RandomStuffScene extends PIXI.Container {
  constructor() {
    super()
    this.setupUI = this.setupUI.bind(this);
    this.setupUI()
  }

  setupUI(){
    this.mixedText && this.mixedText.destroy()

    const min = 2
    const max = 4
    const numElements = min + Math.floor(Math.random() * (max - min))
    const fontSize = 20 + Math.floor(Math.random() * 20)
    var output = []
    for(var i = 0; i < numElements; i++){
      var element = (this.getSortedType() == 'image') ? this.getSortedEmoji() : this.getSortedText(fontSize)
      output.push(element)
    }

    this.mixedText = new MixedText(output)
    this.mixedText.x = app.screen.width * 0.5 - this.mixedText.width / 2
    this.mixedText.y = app.screen.height * 0.5 - this.mixedText.height / 2
    this.addChild(this.mixedText)

    PIXI.setTimeout(2, this.setupUI);
  }

  getSortedType(){
    const i = Math.floor(Math.random() * 2)
    return( i == 0 ? 'image' : 'text' )
  }

  getSortedText(fontSize){
    const i = Math.floor(Math.random() * words.length)
    return new PIXI.Text(words[i], new PIXI.TextStyle({
      fontSize: fontSize,
      fontWeight: 'bold',
      fill: '#ffffff',
      strokeThickness: 2,
      stroke: '#ffcc00',
    }))
  }

  getSortedEmoji(){
    const i = Math.floor(Math.random() * emojis.length)
    return new PIXI.Sprite(PIXI.Texture.from(`assets/emojis/${emojis[i]}.png`))
  }
}