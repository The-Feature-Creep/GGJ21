export const PLAYER_IMG_KEY = "prisoner";

export class Fence extends Phaser.GameObjects.Rectangle {
	constructor(scene: Phaser.Scene, xPosition: number, yPosition: number) {
		super(scene, xPosition, yPosition, 75, 200);
		scene.add.existing(this);
		this.animations(scene);
		this.physics(scene.physics);
	}

	private animations(scene: Phaser.Scene) {}

	private physics(physics: Phaser.Physics.Arcade.ArcadePhysics) {
		physics.add.existing(this, true);
		this.body.gameObject.setCollideWorldBounds = true;
	}
}
