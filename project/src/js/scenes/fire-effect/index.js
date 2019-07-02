import * as PIXI from 'pixi.js'
import * as particles from 'pixi-particles';

var config = require("./flame.json")

var emitter

export default class FireEffectScene extends PIXI.Container {
  constructor() {
    super()
    this.setupUI()
    app.ticker.add(this.onUpdate, this);
  }

  setupUI(){

    const emitterOwner = new PIXI.Container()
    emitterOwner.x = app.screen.width * 0.5
    emitterOwner.y = app.screen.height * 0.5
    this.addChild(emitterOwner);

    console.log(config)



    emitter = new particles.Emitter(
      emitterOwner,
      [PIXI.Texture.from('assets/particles/flame-1.png'),
       PIXI.Texture.from('assets/particles/flame-2.png')],
      config
    )
    emitter.particleBlendMode = PIXI.BLEND_MODES.ADD;


  }

  onUpdate(dt) {
    emitter.update(dt * 0.001);
  }

}