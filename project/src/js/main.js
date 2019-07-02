import * as PIXI from 'pixi.js';
import 'pixi-particles';
import resources from './resources';
import MainMenuScene from './scenes/main-menu';

var currentScene = null

class App extends PIXI.Application {

  constructor() {
    super()
    this.setupPixi()
    this.setupUI()
  }

  setupUI(){
    document.body.appendChild(this.view)
    window.addEventListener('resize', () => this.onResize())
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