export const SHOVEL_IMAGE_KEY = 'shovel';
export class Shovel {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private scene: Phaser.Scene;
  private startingX: number;
  private startingY: number;

  constructor(scene: Phaser.Scene, startingX: number, startingY: number) {
    this.scene = scene;
    this.sprite = this.scene.physics.add
      .sprite(startingX, startingY, SHOVEL_IMAGE_KEY)
      .setCollideWorldBounds(true)
      .setDepth(2000);
    this.sprite.body.setAllowGravity(false);
  }
}
