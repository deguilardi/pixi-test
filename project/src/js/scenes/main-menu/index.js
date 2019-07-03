import * as PIXI from 'pixi.js'
import SpritesStackScene from '../../scenes/sprites-stack';
import FireEffectScene from '../../scenes/fire-effect';

const btnTextureNormal = PIXI.Texture.from('assets/general/btn-horizontal-normal.png')
const btnTextureSelected = PIXI.Texture.from('assets/general/btn-horizontal-selected.png')

const btnsMap = [
  {label: 'sprites stack', action: SpritesStackScene},
  {label: 'random text', action: ''},
  {label: 'fire effect', action: FireEffectScene}
]

var isTouching = false;

export default class MainMenuScene extends PIXI.Container {

  constructor() {
    super()
    this.setupUI()
  }

  setupUI(){
    const self = this
    const btnOffset = 110
    var i = 0
    btnsMap.forEach(function(btnInfo){
        var index = i

        // button background image
        const btnElement = new PIXI.Sprite(btnTextureNormal)
        btnElement.btnNormal = true
        btnElement.interactive = true
        btnElement.x = app.screen.width * 0.5;
        btnElement.anchor.set(0.5);
        btnElement.y = app.screen.height * 0.5 - btnOffset + ( btnOffset * i );
        btnElement.on('mousedown', self.onBtnDown)
                  .on('touchstart', self.onBtnDown)
                  .on('mouseup', () => self.onBtnUp(btnElement, index))
                  .on('touchend', () => self.onBtnUp(btnElement, index))
                  .on('mouseout', self.onBtnMoveOut)
        self.addChild(btnElement)

        // button label
        const labelElement = new PIXI.Text(btnInfo.label, new PIXI.TextStyle({
            fontSize: 38,
            fontWeight: 'bold',
            fill: '#ffffff',
            strokeThickness: 5,
            stroke: '#000000',
        }));
        labelElement.anchor.set(0.5);
        labelElement.y = -10

        btnElement.addChild(labelElement)
        i++
    })
    
  }

  onBtnDown(){
    this.texture = btnTextureSelected
    isTouching = true
  }

  onBtnUp(btn, index){
    btn.texture = btnTextureNormal
    if(isTouching){
      const scene = new btnsMap[index].action
      app.replaceScene(scene)
    }
    isTouching = false
  }

  onBtnMoveOut(){
    this.texture = btnTextureNormal
    isTouching = false
  }
}