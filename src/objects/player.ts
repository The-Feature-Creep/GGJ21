export const PLAYER_IMAGES_KEY = "prisoner";
export class Player extends Phaser.Physics.Arcade.Sprite {
  isHidden: boolean = false;
  hasShovel: boolean = false;
  shovelActive: boolean = false;

  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    textureURL: string
  ) {
    super(scene, xPosition, yPosition, textureURL);
    scene.add.existing(this);
    scene.physics.add
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
  get GetShovelActive() {
    return this.shovelActive;
  }

  set SetHiding(isHiding: boolean) {
    this.isHidden = isHiding;
  }
  set SetHasShovel(hasS: boolean) {
    this.hasShovel = hasS;
  }
  set SetShovelActive(isHiding: boolean) {
    this.isHidden = isHiding;
  }
}
