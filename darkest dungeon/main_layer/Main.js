import "./phaser.js";
import SceneGame from "./SceneGame.js";
//configuraciones del juego, tamaño estático, físicas arace(aunque no se usan) y solo se carga una escena para el juego
var config = {
    type: Phaser.AUTO,
    parent: '',
    width: 1042,
    height: 873,
    backgroundColor: '#fbf0e4',
    physics: {
        default: 'arcade'
    },
    scene: [SceneGame],
    title: 'darkest dungeon map',
    pixelArt: false
};

let game = new Phaser.Game(config);