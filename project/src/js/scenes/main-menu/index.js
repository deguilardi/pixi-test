import * as PIXI from 'pixi.js'

const btnTextureNormal = PIXI.Texture.from('assets/general/btn-horizontal-normal.png')
const btnTextureSelected = PIXI.Texture.from('assets/general/btn-horizontal-selected.png')

const btnsMap = [
  {label: '1. sprites stack', action: ''},
  {label: '2. random text', action: ''},
  {label: '3. fire effect', action: ''}
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
                  .on('mouseup', () => self.onBtnUp(index))
                  .on('touchend', self.onBtnUp)
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

  onBtnUp(index){
    this.texture = btnTextureNormal
    if(isTouching){
        this.onButtonClick.dispatch(btnsMap[index].action)
    }
    isTouching = false
  }

  onBtnMoveOut(){
    this.texture = btnTextureNormal
    isTouching = false
  }
}