import Phaser from "phaser";
import CharacterImg from "./assets/character.png";
import SpotlightImg from "./assets/spotlight.png";

const PLAYER_IMAGE = "char";
const SPOTLIGHT_IMAGE = "spotlightimage";

class MyGame extends Phaser.Scene {
  private player;
  private cursors;
  private velocity: Phaser.Math.Vector2;

  private spotlight: {
    object: Phaser.GameObjects.Image;
    pos: Phaser.Math.Vector2;
    desiredPos: Phaser.Math.Vector2;
    velocity: Phaser.Math.Vector2;
    distance: number;
    buffer: number;
    total_difference: number;
  } = {
    object: null,
    pos: new Phaser.Math.Vector2(1, 1),
    desiredPos: new Phaser.Math.Vector2(400, 450),
    velocity: new Phaser.Math.Vector2(),
    distance: 0,
    buffer: 100,
    total_difference: 0,
  };

  constructor() {
    super("demo");
  }

  preload() {
    //this.load.image(PLAYER_IMAGE, CharacterImg);
    this.load.image(SPOTLIGHT_IMAGE, SpotlightImg);
  }

  create() {
    //this.player = this.add.image(400, 450, PLAYER_IMAGE);
    //this.player.scale = 0.8;

    this.spotlight.object = this.add.image(
      this.spotlight.pos.x,
      this.spotlight.pos.y,
      SPOTLIGHT_IMAGE
    );
    this.spotlight.object.x;
    this.spotlight.object.scale = 2;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.velocity = new Phaser.Math.Vector2();
  }

  update() {
    //spotlight movement

    this.spotlight.distance = Phaser.Math.Distance.BetweenPoints(
      this.spotlight.pos,
      this.spotlight.desiredPos
    );

    this.spotlight.total_difference =
      Math.abs(this.spotlight.desiredPos.x - this.spotlight.pos.x) +
      Math.abs(this.spotlight.desiredPos.y - this.spotlight.pos.y);

    if (this.spotlight.distance > this.spotlight.buffer) {
      if (
        Math.abs(this.spotlight.velocity.x) <=
        (5 * Math.abs(this.spotlight.desiredPos.x - this.spotlight.pos.x)) /
          (this.spotlight.total_difference + 0.01)
      ) {
        this.spotlight.velocity.x +=
          (this.spotlight.desiredPos.x - this.spotlight.pos.x) / 3000;
      }

      if (
        Math.abs(this.spotlight.velocity.y) <=
        (5 * Math.abs(this.spotlight.desiredPos.y - this.spotlight.pos.y)) /
          (this.spotlight.total_difference + 0.01)
      ) {
        this.spotlight.velocity.y +=
          (this.spotlight.desiredPos.y - this.spotlight.pos.y) / 3000;
      }
    } else {
      if (this.spotlight.velocity.x > 1) {
        this.spotlight.velocity.x -= 0.05;
      }
      if (this.spotlight.velocity.y > 1) {
        this.spotlight.velocity.y -= 0.05;
      }
    }

    if (
      Phaser.Math.Distance.BetweenPoints(
        new Phaser.Math.Vector2(
          this.spotlight.pos.x + this.spotlight.velocity.x,
          this.spotlight.pos.y + this.spotlight.velocity.y
        ),
        this.spotlight.desiredPos
      ) > this.spotlight.distance
    ) {
      if (this.spotlight.velocity.x > 0) {
        this.spotlight.velocity.x -= 0.03;
      } else {
        this.spotlight.velocity.x += 0.03;
      }
      if (this.spotlight.velocity.y > 0) {
        this.spotlight.velocity.y -= 0.03;
      } else {
        this.spotlight.velocity.y += 0.03;
      }
    }

    //changing location

    console.log(this.spotlight);

    this.spotlight.pos.add(this.spotlight.velocity);

    this.spotlight.object.x = this.spotlight.pos.x;
    this.spotlight.object.y = this.spotlight.pos.y;

    //New Location selection
    if (this.spotlight.distance < 100) {
      if (Math.random() > 0.4) {
        if (Math.random() < 0.5) {
          this.spotlight.desiredPos.x = 0;
          this.spotlight.desiredPos.y = Math.random() * 500;
        } else {
          this.spotlight.desiredPos.x = 1000;
          this.spotlight.desiredPos.y = Math.random() * 500;
        }
      } else {
        if (Math.random() > 0.5) {
          this.spotlight.desiredPos.x = Math.random() * 1000;
          this.spotlight.desiredPos.y = 0;
        } else {
          this.spotlight.desiredPos.x = Math.random() * 1000;
          this.spotlight.desiredPos.y = 500;
        }
      }
    }

    Math.random() * 1000;
    Math.random() * 500;

    //Character movement
    // move left and right
    // if (this.cursors.left.isDown)
    // {
    //     this.velocity.x -= 2;
    // }
    // else if (this.cursors.right.isDown)
    // {
    //     this.velocity.x += 2;
    // }
    // // jump if on ground
    // if (this.cursors.up.isDown && this.player.y >= 450)
    // {
    //     this.velocity.y = -30;
    // }
    // this.player.x += this.velocity.x;
    // this.player.y += this.velocity.y;
    // // gravity
    // if (this.player.y < 450)
    //     this.velocity.y += 2;
    // else
    //     this.velocity.y = 0;
    // // keep character on screen
    // if (this.player.x < 80)
    // {
    //     this.player.x = 80;
    //     this.velocity.x = 0;
    // }
    // else if (this.player.x > 800 - 80)
    // {
    //     this.player.x = 800 - 80;
    //     this.velocity.x = 0;
    // }
    // // slow to a stop if no input
    // this.velocity.x *= 0.9;
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1000,
  height: 500,
  scene: MyGame,
};

const game = new Phaser.Game(config);
