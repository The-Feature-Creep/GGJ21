export class Terrain extends Phaser.Physics.Arcade.Sprite {
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
      .setDepth(1000)
      // .setScale(10, 1)
      .setImmovable(true)
      .setCollideWorldBounds(true);
  }
}
