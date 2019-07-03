import * as PIXI from 'pixi.js'
import 'pixi-particles'
import resources from './resources'
import MainMenuScene from './scenes/main-menu'

var currentScene = null

class App extends PIXI.Application {

  constructor() {
    super()
    this.setupPixi()
    this.setupUI()
  }

  setupUI(){
    document.body.appendChild(this.view)

    // fullscreen
    window.LP = window.innerWidth > window.innerHeight ? a => a : (a, b) => b
    const mw = LP(window.innerWidth * 640 / window.innerHeight, window.innerWidth * 960 / window.innerHeight)
    const mh = LP(window.innerHeight * 960 / window.innerWidth, window.innerHeight * 640 / window.innerWidth)
    const scale = Math.max(mw / window.innerWidth, mh / window.innerHeight)
    this.renderer.resize(Math.ceil(window.innerWidth * scale), Math.ceil(window.innerHeight * scale))
    this.view.style.width = `${window.innerWidth}px`
    this.view.style.height = `${window.innerHeight}px`
  }

  setupPixi() {
    Object.keys(resources).forEach(key => PIXI.loader.add(key, resources[key]));
    PIXI.loader.load(() => this.onLoad());
  }

  onLoad() {
    this.replaceScene(new MainMenuScene(this))
  }

  replaceScene(scene){
    currentScene && currentScene.destroy()
    app.stage.addChild(scene)
    currentScene = scene
  }
}

const app = new App()
window.app = app