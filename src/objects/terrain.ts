export const TERRAIN_KEY = "terrain";

export class Terrain extends Phaser.GameObjects.Rectangle {
	constructor(scene: Phaser.Scene, xPosition: number, yPosition: number) {
		super(scene, xPosition, yPosition, 2000, 100, 0xff00aa);
		scene.add.existing(this);
		const physics = scene.physics.add.existing(this, true).setDepth(1000);
		physics.body.gameObject.setCollideWorldBounds = true;
	}
}
