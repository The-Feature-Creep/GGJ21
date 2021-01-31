export const PLAYER_IMG_KEY = "prisoner";
export const PLAYER_WALK_CYCLE = "prisoner-walk";
export const PLAYER_STATIONARY_CYCLE = "prisoner-stand";

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
