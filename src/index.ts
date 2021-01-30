import Phaser from "phaser";
import { GameScene } from "./scenes/Game";
import { MainMenuScene } from "./scenes/MainMenu";
import { CreditScene } from "./scenes/Credits";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1000,
  height: 500,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [MainMenuScene, CreditScene, GameScene],
};

const game = new Phaser.Game(config);
