import { config } from '../';
export const SPOTLIGHT_IMG_KEY = 'spotlight';
const MAX_VELOCITY = 5;
const ACCELERATION_MODIFER = 0.1;
const MAX_WIDTH_MODIFIER = 0;
const MAX_HEIGHT_MODIFIER = 0;
const SKY_HEIGHT_MODIFIER = 100;

interface boundaryHit {
  dimension: 'x' | 'y';
  boundary: 'max' | 'min';
}

export class Spotlight {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private scene: Phaser.Scene;
  private startingX: number;
  private startingY: number;
  private point: Phaser.Math.Vector2;
  private velocity: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  constructor(scene: Phaser.Scene, startingX: number, startingY: number) {
    this.scene = scene;
    this.startingX = startingX;
    this.startingY = startingY;
    this.addSpotlight();
    this.update();
  }

  private addSpotlight() {
    this.sprite = this.scene.physics.add
      .sprite(this.startingX, this.startingY, SPOTLIGHT_IMG_KEY)
      .setCollideWorldBounds(true)
      .setDepth(2000);
    this.sprite.body.setAllowGravity(false);

    this.sprite.scale = 0.5;
    this.startMovement();
  }

  private getNextPosition(x: number, y: number) {
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

  private startMovement() {
    if (this.startingX !== 0 && this.startingY !== 0) {
      const xRatio = this.startingX / config.width;
      const yRatio = this.startingY / config.height;
      if (xRatio < yRatio) {
        this.startingX = 0;
      } else {
        this.startingY = 0;
      }
    }
    this.movePoint();
  }

  private movePoint(boundaryHit?: boundaryHit) {
    const [x, y] = this.point
      ? [
          !boundaryHit || boundaryHit.dimension !== 'x'
            ? this.point.x
            : boundaryHit.boundary === 'max'
            ? config.width
            : 0,
          !boundaryHit || boundaryHit.dimension !== 'y'
            ? this.point.y
            : boundaryHit.boundary === 'max'
            ? config.height
            : 0,
        ]
      : [this.startingX, this.startingY];
    this.point = this.getNextPosition(x, y);
  }

  update(x?: number, y?: number) {
    // this.zone.x = this.sprite.x;
    // this.zone.y = this.sprite.y;

    if (x !== undefined && y !== undefined) {
      this.sprite.x = x;
      this.sprite.y = y;
      return;
    }
    const imageVector = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);

    const dist = Phaser.Math.Distance.BetweenPoints(this.point, imageVector);

    this.velocity.x +=
      ((this.point.x - this.sprite.x) / dist) * ACCELERATION_MODIFER;
    this.velocity.y +=
      ((this.point.y - this.sprite.y) / dist) * ACCELERATION_MODIFER;

    this.velocity.x =
      this.velocity.x > MAX_VELOCITY
        ? MAX_VELOCITY
        : this.velocity.x < MAX_VELOCITY * -1
        ? MAX_VELOCITY * -1
        : this.velocity.x;
    this.velocity.y =
      this.velocity.y > MAX_VELOCITY
        ? MAX_VELOCITY
        : this.velocity.y < MAX_VELOCITY * -1
        ? MAX_VELOCITY * -1
        : this.velocity.y;

    this.sprite.x += this.velocity.x;
    this.sprite.y += this.velocity.y;

    let boundaryHit: boundaryHit;
    if (this.sprite.x >= config.width - MAX_WIDTH_MODIFIER && this.velocity.x) {
      this.velocity.x = 0;
      this.sprite.x = config.width - MAX_WIDTH_MODIFIER;
      boundaryHit = {
        dimension: 'x',
        boundary: 'max',
      };
    } else if (this.sprite.x <= MAX_WIDTH_MODIFIER && this.velocity.x) {
      this.velocity.x = 0;
      this.sprite.x = MAX_WIDTH_MODIFIER;
      boundaryHit = {
        dimension: 'x',
        boundary: 'min',
      };
    }

    if (
      this.sprite.y >= config.height - MAX_HEIGHT_MODIFIER &&
      this.velocity.y
    ) {
      this.velocity.y = 0;
      this.sprite.y = config.height - MAX_HEIGHT_MODIFIER;
      boundaryHit = {
        dimension: 'y',
        boundary: 'max',
      };
    } else if (
      this.sprite.y <= MAX_HEIGHT_MODIFIER + SKY_HEIGHT_MODIFIER &&
      this.velocity.y
    ) {
      this.velocity.y = 0;
      this.sprite.y = MAX_HEIGHT_MODIFIER + SKY_HEIGHT_MODIFIER;
      boundaryHit = {
        dimension: 'y',
        boundary: 'min',
      };
    }
    if (dist < 100 || boundaryHit) {
      this.movePoint(boundaryHit);
    }
  }
}
