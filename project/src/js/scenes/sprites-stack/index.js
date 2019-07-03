import * as PIXI from 'pixi.js'
import 'pixi-timeout'
import MainMenuScene from '../main-menu'

const NUM_CARDS = 144

export default class SpritesStackScene extends PIXI.Container {
  constructor() {
    super()
    this.setupUI()
    app.ticker.add(this.onUpdate, this);
  }

  setupUI(){
    const closeButton = new PIXI.Text("close", new PIXI.TextStyle({ fill: '#ffffff' }))
    closeButton.anchor.set(1, 0)
    closeButton.x = app.screen.width - 10
    closeButton.interactive = true
    closeButton.buttonMode = true
    closeButton.on('pointerdown', () => app.replaceScene(new MainMenuScene()));
    this.addChild(closeButton);

    this.setupFpsInfo()
    this.setupCards()
  }

  setupFpsInfo(){
    const fpsElement = new PIXI.Text('', new PIXI.TextStyle({
      fill: '#ffffff',
    }));
    fpsElement.x = 10;
    fpsElement.y = 15;
    this.addChild(fpsElement);

    this.fpsElement = fpsElement
    this.updateFpsInfo = this.updateFpsInfo.bind(this);
    this.updateFpsInfo()
  }

  updateFpsInfo(){
    this.fpsElement.text = `FPS:${app.ticker.FPS.toFixed(0)}`
    PIXI.setTimeout(1, this.updateFpsInfo);
  }

  setupCards(){
    const cardTexture = PIXI.Texture.from('assets/general/card.png')
    const offset = 5
    this.cards = []
    for (var i = 0, l = NUM_CARDS; i < l; i++) {
      const cardElement = new PIXI.Sprite(cardTexture)
      cardElement.anchor.set(0.5)
      cardElement.x = app.screen.width * 0.2
      cardElement.y = app.screen.height * 0.5 -( offset * NUM_CARDS / 2 ) + offset * i
      this.cards.push(cardElement)
      this.addChild(cardElement)
      this.moveElementTo(cardElement, app.screen.width * 0.8, 2, NUM_CARDS - 1 * i)
    }
  }

  onUpdate(dt) {
    for (var i = 0, l = NUM_CARDS; i < l; i++) {
      var card = this.cards[i]
      if(card.animation.active){
        if(card.animation.delay > 0){
          card.animation.delay -= dt
        }
        else{
          card.animation.delta.current += dt
          if(card.animation.delta.current >= card.animation.delta.total){
            card.animation.delta.current = card.animation.delta.total
            card.animation.active = false
          }

          // change the z-order
          if(!card.animation.zChanged && card.animation.delta.current >= card.animation.delta.total / 2){
            card.animation.zChanged = true
            this.addChild(card)
          }

          card.x = card.animation.x.ini
                 + (card.animation.x.end - card.animation.x.ini) / card.animation.delta.total * card.animation.delta.current
        }
      }
    }
  }

  moveElementTo(element, x, duration, delay){
    element.animation = {
      active: true,
      zChanged: false,
      delay: delay * 60,
      delta: {total: duration * 60, current: 0},
      x: {ini: element.x, end: x}
    }
  }
}