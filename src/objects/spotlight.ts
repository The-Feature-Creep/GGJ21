import { config } from '../';
export const SPOTLIGHT_IMG_KEY = 'spotlight';
const MAX_VELOCITY = 150;
const ACCELERATION_MODIFER = 2;

export class Spotlight {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private scene: Phaser.Scene;
  private point: Phaser.Math.Vector2;

  constructor(scene: Phaser.Scene, startingX: number, startingY: number) {
    this.scene = scene;
    this.point = new Phaser.Math.Vector2(startingX, startingY);
    this.addSpotlight(startingX, startingY);
    this.update();
  }

  private addSpotlight(x: number, y: number) {
    this.sprite = this.scene.physics.add
      .sprite(x, y, SPOTLIGHT_IMG_KEY)
      .setCollideWorldBounds(true)
      .setDepth(2000);
    this.sprite.body.bounce.set(0.8, 0.8);
    this.sprite.body.setAllowGravity(false);

    this.sprite.scale = 0.5;
    this.movePoint();
  }

  private getNextPosition(x: number, y: number) {
    if (x !== 0 && y !== 0) {
      const xRatio = x / config.width;
      const yRatio = y / config.height;
      if (xRatio < yRatio) {
        x = 0;
      } else {
        y = 0;
      }
    }

    const random = Math.ceil(Math.random() * 3);
    if (x === 0 || x === config.width) {
      if (random === 1 || random === 2) {
        x =
          x === 0
            ? Math.floor(100 + Math.random() * (config.width - 100))
            : Math.floor(Math.random() * (config.width - 100));
        y = random === 1 ? 0 : config.height;
      } else {
        x = x === config.width ? 0 : config.width;
        y = Math.floor(Math.random() * config.height);
      }
    } else {
      if (random === 1 || random === 2) {
        x = random === 1 ? 0 : config.width;
        y =
          y === 0
            ? Math.floor(100 + Math.random() * (config.height - 100))
            : Math.floor(Math.random() * (config.height - 100));
      } else {
        x = Math.floor(Math.random() * config.width);
        y = y === config.height ? 0 : config.height;
      }
    }
    return new Phaser.Math.Vector2(x, y);
  }

  private movePoint() {
    this.point = this.getNextPosition(this.point.x, this.point.y);
  }

  update(x?: number, y?: number) {
    if (x !== undefined && y !== undefined) {
      this.sprite.x = x;
      this.sprite.y = y;
      return;
    }
    const imageVector = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);

    const dist = Phaser.Math.Distance.BetweenPoints(this.point, imageVector);

    this.sprite.setMaxVelocity(MAX_VELOCITY);

    this.sprite.setVelocityX(
      this.sprite.body.velocity.x +
        ((this.point.x - this.sprite.x) / dist) * ACCELERATION_MODIFER
    );

    this.sprite.setVelocityY(
      this.sprite.body.velocity.y +
        ((this.point.y - this.sprite.y) / dist) * ACCELERATION_MODIFER
    );

    if (dist < 200) {
      this.movePoint();
    }
  }
}
