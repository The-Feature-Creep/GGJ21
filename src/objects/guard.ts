export const GUARD_IMG_KEY = "guard";
export const GUARD_2_IMG_KEY = "guard-2";
export const GUARD_WALK_CYCLE = "guard-walk-cycle";
export const GUARD_2_WALK_CYCLE = "guard-walk-cycle-2";
export const GUARD_STATIONARY_CYCLE = "guard-stationary-cycle";
export const GUARD_2_STATIONARY_CYCLE = "guard-stationary-cycle-2";

const GUARD_SMOKE_CYCLE = "guard-smoke-cycle";
const GUARD_2_SMOKE_CYCLE = "guard-smoke-cycle-2";

const viewDistance = 100;

export class Guard extends Phaser.Physics.Arcade.Sprite {
	private isKnockedOut: boolean;
	private iPosition: number;
	private fPosition: number;
	private facingDirection: "left" | "right";
	private isStationary: boolean;

	private velocity: number;
	private key: string;

	private animMap:Map<string, string>;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		var key = Math.random() > .5 ? GUARD_IMG_KEY : GUARD_2_IMG_KEY;
		super(scene, x, y, key);

		this.key = key;

		this.animMap = new Map<string, string>();
		this.animMap.set("guard-walk", GUARD_WALK_CYCLE);
		this.animMap.set("guard-stationary", GUARD_STATIONARY_CYCLE);
		this.animMap.set("guard-2-walk", GUARD_2_WALK_CYCLE);
		this.animMap.set("guard-2-stationary", GUARD_2_STATIONARY_CYCLE);
		this.animMap.set("guard-smoke", GUARD_SMOKE_CYCLE);
		this.animMap.set("guard-2-smoke", GUARD_2_SMOKE_CYCLE);

		this.isStationary = false;
		this.velocity = 0.8;
		scene.add.existing(this);
		this.animations(scene);
		this.physics(scene.physics);
		this.setDestination();
	}

	private animations(scene: Phaser.Scene) {
		scene.anims.create({
			key: GUARD_WALK_CYCLE,
			frames: scene.anims.generateFrameNumbers(GUARD_IMG_KEY, {
				start: 1,
				end: 19,
			}),
			frameRate: 24,
			repeat: -1,
		});
		scene.anims.create({
			key: GUARD_STATIONARY_CYCLE,
			frames: scene.anims.generateFrameNumbers(GUARD_IMG_KEY, {
				start: 0,
				end: 0,
			}),
			frameRate: 24,
			repeat: -1,
		});
		scene.anims.create({
			key: GUARD_SMOKE_CYCLE,
			frames: scene.anims.generateFrameNumbers(GUARD_IMG_KEY, {
				start: 21,
				end: 47,
			}),
			frameRate: 24,
			repeat: -1,
		});
		scene.anims.create({
			key: GUARD_2_WALK_CYCLE,
			frames: scene.anims.generateFrameNumbers(GUARD_2_IMG_KEY, {
				start: 1,
				end: 19,
			}),
			frameRate: 24,
			repeat: -1,
		});
		scene.anims.create({
			key: GUARD_2_STATIONARY_CYCLE,
			frames: scene.anims.generateFrameNumbers(GUARD_2_IMG_KEY, {
				start: 0,
				end: 0,
			}),
			frameRate: 24,
			repeat: -1,
		});
		scene.anims.create({
			key: GUARD_2_SMOKE_CYCLE,
			frames: scene.anims.generateFrameNumbers(GUARD_2_IMG_KEY, {
				start: 21,
				end: 47,
			}),
			frameRate: 24,
			repeat: -1,
		});
	}

	private physics(physics: Phaser.Physics.Arcade.ArcadePhysics) {
		physics.add // This gives the sprite a dynamic body
			.existing(this)
			.setDepth(999) // change render order (z-index) to keep it above obstacles
			.setSize(100, 127) // size offset for collision with the ground
			.setBounce(0.2)
			.setCollideWorldBounds(false);
	}

	updatePosition() {
		if (!this.isStationary) {
			if (this.fPosition > this.iPosition) {
				this.x += this.velocity;
				if (this.x >= this.fPosition) {
					this.setStationary();
				}
			} else {
				this.x -= this.velocity;
				if (this.x <= this.fPosition) {
					this.setStationary();
				}
			}
			this.anims.play(this.animMap.get(this.key + "-walk"), true);
		} else {
			// const SpriteSheetFrames = this.scene.anims.get(GUARD_STATIONARY_CYCLE);
			this.anims.play(this.animMap.get(this.key + "-smoke"), true);
			// console.log(SpriteSheetFrames);
		}
	}

	canSeePlayer(playerX: number, playerY: number, isPlayerHidden: boolean): boolean {
		if (!isPlayerHidden) {
			let maxFOV;
			if (this.fPosition > this.iPosition) {
				maxFOV = this.x + viewDistance;
				if (playerX < maxFOV && playerX > this.x) {
					// Player is between player and maxFOV
					return true;
				}
			} else {
				maxFOV = this.x - viewDistance;
				if (playerX > maxFOV && playerX < this.x) {
					return true;
				}
			}
		}
		return false;
	}

	private setDestination() {
		let validDestination: boolean = false;
		let destination: number = 0;
		while (!validDestination) {
			const delta = Math.random() * 1000;
			// console.log({ delta: delta, myPos: this.x });

			if (Math.random() > 0.5) {
				destination = this.x + delta;
			} else {
				destination = this.x - delta;
			}

			if (destination < 1000 && destination > 0) {
				// This is a valid destination
				this.iPosition = this.x;
				this.fPosition = destination;
				// console.log("Destination: ", this.fPosition);
				validDestination = true;
			}
		}

		this.setFlipX(this.fPosition < this.iPosition);
	}

	private setStationary() {
		const stationaryTimeout = (Math.random() * 10000) / 2;
		// console.log({ StationaryTimeout: stationaryTimeout });

		this.isStationary = true;
		setTimeout(() => {
			this.setDestination();
			this.isStationary = false;
		}, stationaryTimeout);
	}
}
