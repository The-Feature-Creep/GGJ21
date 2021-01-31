// import { PLAYER_WALK_CYCLE } from './player';
export const PLAYER_IMG_KEY = 'prisoner';
export const PLAYER_WALK_CYCLE = 'prisoner-walk';
export const PLAYER_STATIONARY_CYCLE = 'prisoner-stand';
export const PLAYER_WALK_SHOVEL_CYCLE = 'prisoner-walk-shovel';
export const PLAYER_STATIONARY_SHOVEL_CYCLE = 'prisoner-stand-shovel';

export class Player extends Phaser.Physics.Arcade.Sprite {
  isHidden: boolean = false;
  hasShovel: boolean = false;
  isShovelActive: boolean = false;

  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    textureURL: string
  ) {
    super(scene, xPosition, yPosition, textureURL);
    scene.add.existing(this);

    this.animations(scene);
    this.physics(scene.physics);
  }

  private animations(scene: Phaser.Scene) {
    scene.anims.create({
      key: PLAYER_WALK_CYCLE,
      frames: scene.anims.generateFrameNumbers(PLAYER_IMG_KEY, {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
    scene.anims.create({
      key: PLAYER_STATIONARY_CYCLE,
      frames: scene.anims.generateFrameNumbers(PLAYER_IMG_KEY, {
        start: 0,
        end: 0,
      }),
      frameRate: 12,
      repeat: -1,
    });
    scene.anims.create({
      key: PLAYER_WALK_SHOVEL_CYCLE,
      frames: scene.anims.generateFrameNumbers(PLAYER_IMG_KEY, {
        start: 8,
        end: 15,
      }),
      frameRate: 12,
      repeat: -1,
    });
    scene.anims.create({
      key: PLAYER_STATIONARY_SHOVEL_CYCLE,
      frames: scene.anims.generateFrameNumbers(PLAYER_IMG_KEY, {
        start: 8,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  private physics(physics: Phaser.Physics.Arcade.ArcadePhysics) {
    physics.add
      .existing(this)
      .setSize(100, 110)
      .setBounce(0.2)
      .setCollideWorldBounds(true);
  }

  get GetHiding() {
    return this.isHidden;
  }
  get GetHasShovel() {
    return this.hasShovel;
  }

  get getIsHidden() {
    return this.isHidden;
  }
  get getHasShovel() {
    return this.hasShovel;
  }
  get getIsShovelActive() {
    return this.isShovelActive;
  }

  set setIsHidden(isHiding: boolean) {
    this.isHidden = isHiding;
  }
  set setHasShovel(hasShovel: boolean) {
    this.hasShovel = hasShovel;
  }
  set setIsShovelActive(isShovelActive: boolean) {
    this.isShovelActive = isShovelActive;
  }
}
