export class Obstacles extends Phaser.Physics.Arcade.Sprite {
	constructor(
		scene: Phaser.Scene,
		xPosition: number,
		yPosition: number,
		textureURL: string
	) {
		super(scene, xPosition, yPosition, textureURL);
		scene.add.existing(this);
		scene.physics.add.existing(this, true).setImmovable(true).refreshBody();
	}
}
