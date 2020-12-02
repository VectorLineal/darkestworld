import "./phaser.js";

export default class SceneGame extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene", active: true });
    this.areaPicture;
    this.easyFrame = 0;
  }

  preload() {
    //carga spritesheet con las fotos de las locaciones, luego el mapa que servirá de fondo
    this.load.spritesheet("map_frames", "assets/map_sheet.png", {frameWidth: 500, frameHeight: 281});
    this.load.image("map", "assets/regionMap.png");
  }

  create() {
    //obtener ancho y alto del canvas
    let { width, height } = this.sys.game.canvas;
    //ancho y alto de todos los botones del mapa
    let bWidth = 270;
    let bHeight = 125;
    //dibujado del mapa de fondo con depth 0 para que siempre sea el fondo
    this.add.image(width / 2, height / 2, "map").setDepth(0);
    //foto de las locaciones, al inicio no se debe mostrar ninguna
    this.areaPicture = this.add.image(3 * width / 4, height - 140, "map_frames").setAlpha(0.8).setDepth(1).setVisible(false);
    this.areaPicture.code = -1;
    //locaciones de los botones, luego se itera la lista para crearlos con su locación y un código que representa el frame de cada locación
    let buttonPoints =[{x:873, y: 360}, {x:842, y: 62.5}, {x:538, y: 170}, {x:396, y: 362}, {x:570, y: 490}, {x:160, y: 286}, {x:147, y: 566}];
    for(var i = 0; i< buttonPoints.length; i++){
      var button = this.add.rectangle(buttonPoints[i].x, buttonPoints[i].y, bWidth, bHeight, 0x555555).setDepth(0.5).setAlpha(0.25).setInteractive();
      button.code = i;
      //se le asigna un evento clicked al botón que llamará a la función putImage al activarse
      button.on('clicked', this.putImage, this);
    }
    //al tocar algún botón, se llamará al evento clicked
    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);
    //este evento se usa cuando se clickea fuera de cualquier otro botón y sirve para poner la imagen de la locaciónd de nuevo invisible y quitar su interctividad
    this.input.on('pointerdown', function (pointer, currentlyOver){
      if(currentlyOver.length == 0){
        this.areaPicture.setVisible(false);
        this.areaPicture.input.enabled = false;
        this.areaPicture.off('clicked', putImage);
      }
    }, this);
  }

  update() { //para este mapa no se va a usar, todo se maneja desde eventos
    
  }

  //funciones no heredadas de scene
  putImage(button){
    if(button.code == -1){//al ser clickeada la locación, se enrutará a la página de locaciones y su subbsección respectiva
      switch(this.easyFrame){
        case 0:
          window.location.href = "location.html#cove";
          return;
        case 1:
          window.location.href = "location.html#darkest-dungeon";
          return;
        case 2:
          window.location.href = "location.html#ruins";
          return;
        case 3:
          window.location.href = "location.html#warrens";
          return;
        case 4:
          window.location.href = "location.html#weald";
          return;
        case 5:
          window.location.href = "location.html#courtyard";
          return;
        case 6:
          window.location.href = "location.html#farmstead";
          return;
        default:
          return;
      }

    }
    //en caso que se clickee un botón, se ajusta el frame de la locación y se vuelve visible, además se le agrega su interactividad
    this.areaPicture.setFrame(button.code);
    this.easyFrame = button.code;
    this.areaPicture.setVisible(true);
    this.areaPicture.setInteractive();
    this.areaPicture.on('clicked', this.putImage, this);
  }
}
