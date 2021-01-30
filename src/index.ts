import Phaser from 'phaser';
import { GameScene } from './scenes/Game';
import { MainMenuScene } from './scenes/MainMenu';
import { CreditScene } from './scenes/Credits';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: [MainMenuScene, CreditScene, GameScene],
};

const game = new Phaser.Game(config);
