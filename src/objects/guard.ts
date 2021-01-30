export const GUARD_IMG_KEY = "guard";

export class Guard extends Phaser.GameObjects.Sprite {
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
		}
	}

	private setDestination() {
		let validDestination: boolean = false;
		let destination: number = 0;
		while (!validDestination) {
			const delta = Math.random() * 1000;
			console.log({ delta: delta, myPos: this.x });

			if (Math.random() > 0.5) {
				destination = this.x + delta;
			} else {
				destination = this.x - delta;
			}

			if (destination < 1000 && destination > 0) {
				// This is a valid destination
				this.iPosition = this.x;
				this.fPosition = destination;
				console.log("Destination: ", this.fPosition);

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
		console.log(stationaryTimeout);

		this.isStationary = true;
		setTimeout(() => {
			this.setDestination();
			this.isStationary = false;
		}, stationaryTimeout);
	}
}
