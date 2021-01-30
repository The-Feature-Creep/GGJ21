import CharacterImg from '../assets/character.png';
import SpotlightImg from '../assets/spotlight.png';
import { Spotlight, SPOTLIGHT_IMG_KEY } from '../objects/spotlight';
export class GameScene extends Phaser.Scene {
  private player;
  private cursors;
  private velocity: Phaser.Math.Vector2;
  private spotlight: Spotlight;

  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('char', CharacterImg);
    this.load.image(SPOTLIGHT_IMG_KEY, SpotlightImg);
  }

  create() {
    this.player = this.add.image(400, 450, 'char');
    this.player.scale = 0.2;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.velocity = new Phaser.Math.Vector2();
    this.spotlight = new Spotlight(this, 0, 0);
  }

  update() {
    // move left and right
    if (this.cursors.left.isDown) {
      this.velocity.x -= 2;
    } else if (this.cursors.right.isDown) {
      this.velocity.x += 2;
    }

    // jump if on ground
    if (this.cursors.up.isDown && this.player.y >= 450) {
      this.velocity.y = -30;
    }

    this.player.x += this.velocity.x;
    this.player.y += this.velocity.y;

    // gravity
    if (this.player.y < 450) this.velocity.y += 2;
    else this.velocity.y = 0;

    // keep character on screen
    if (this.player.x < 80) {
      this.player.x = 80;
      this.velocity.x = 0;
    } else if (this.player.x > 800 - 80) {
      this.player.x = 800 - 80;
      this.velocity.x = 0;
    }

    // slow to a stop if no input
    this.velocity.x *= 0.9;
    this.spotlight.update();
  }
}
