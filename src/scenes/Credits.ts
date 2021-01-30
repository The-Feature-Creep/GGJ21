import BackDefault from "../assets/main-menu/back-default.svg";
import BackHover from "../assets/main-menu/back-hover.svg";
import BackClick from "../assets/main-menu/back-click.svg";

export class CreditScene extends Phaser.Scene {
	back: Phaser.GameObjects.Sprite;
	constructor() {
		super("Credits");
	}

	preload() {
		this.load.image("back-button-default", BackDefault);
		this.load.image("back-button-hover", BackHover);
		this.load.image("back-button-click", BackClick);
	}

	create() {
		this.back = this.add
			.sprite(400, 525, "back-button-default")
			.setInteractive()
			.on("pointerdown", () => {
				this.back.setTexture("back-button-click");
			})
			.on("pointerup", () => {
				this.back.setTexture("back-button-default");
				this.scene.start("MainMenu");
			})
			.on("pointerover", () => {
				this.back.setTexture("back-button-hover");
			})
			.on("pointerout", () => {
				this.back.setTexture("back-button-default");
			});

		this.events.on("destroy", this.destroy);
	}

	update() {}

	destroy() {
		this.back.removeAllListeners();
	}
}
