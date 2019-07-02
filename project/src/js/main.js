import * as PIXI from 'pixi.js';
import resources from './resources';
import MainMenuScene from './scenes/main-menu';

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
    const loader = PIXI.Loader.shared;
    Object.keys(resources).forEach(key => loader.add(key, resources[key]))
    loader.load((loader, resources) => {
      this.onLoad()
    })
  }

  onLoad() {
    const mainMenuSceneScne = new MainMenuScene(this);
    app.stage.addChild(mainMenuSceneScne);
  }
}

const app = new App();
window.app = app;