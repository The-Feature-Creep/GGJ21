export const GUARD_IMG_KEY = "guard";
export const GUARD_WALK_CYCLE = "guard-walk-cycle";
export const GUARD_STATIONARY_CYCLE = "guard-stationary-cycle";

export class Guard extends Phaser.Physics.Arcade.Sprite {
	private isKnockedOut: boolean;
	private iPosition: number;
	private fPosition: number;
	private facingDirection: "left" | "right";
	private isStationary: boolean;

	private velocity: number;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, GUARD_IMG_KEY);
		this.isStationary = false;
		this.velocity = 0.8;
		scene.add.existing(this);
		scene.physics.add // This gives the sprite a dynamic body
			.existing(this)
			.setDepth(999) // change render order (z-index) to keep it above obstacles
			.setSize(100, 127) // size offset for collision with the ground
			.setBounce(0.2)
			.setCollideWorldBounds(true);
		scene.anims.create({
			key: GUARD_WALK_CYCLE,
			frames: scene.anims.generateFrameNumbers(GUARD_IMG_KEY, {
				start: 1,
				end: 20,
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
		this.setDestination();
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
			this.anims.play(GUARD_WALK_CYCLE, true);
		} else {
			// const SpriteSheetFrames = this.scene.anims.get(GUARD_STATIONARY_CYCLE);
			this.anims.play(GUARD_STATIONARY_CYCLE, true);
			// console.log(SpriteSheetFrames);
		}
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

		if (this.fPosition < this.iPosition) {
			this.setScale(-1, this.scaleY);
		} else {
			this.setScale(1, this.scaleY);
		}
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
