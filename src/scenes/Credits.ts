export class CreditScene extends Phaser.Scene {
	play;
	credits;
	constructor() {
		super("Credits");
	}

	preload() {}

	create() {
		this.events.on("destroy", () => {});
	}

	update() {}
}
