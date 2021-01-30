import PlayInactive from "../assets/main-menu/play-inactive.svg";
import PlayActive from "../assets/main-menu/play-active.svg";

import CreditsInactive from "../assets/main-menu/credits-inactive.svg";
import CreditsActive from "../assets/main-menu/credits-active.svg";

export class MainMenuScene extends Phaser.Scene {
	play: Phaser.GameObjects.Sprite;
	credits: Phaser.GameObjects.Sprite;
	constructor() {
		super("MainMenu");
	}

	preload() {
		this.load.image("play-button-inactive", PlayInactive);
		this.load.image("play-button-active", PlayActive);

		this.load.image("credits-button-inactive", CreditsInactive);
		this.load.image("credits-button-active", CreditsActive);
	}

	create() {
		this.play = this.add
			.sprite(400, 200, "play-button-inactive")
			.setScale(0.5)
			.setInteractive()
			.on("pointerdown", () => {
				this.play.setTexture("play-button-active");
				this.scene.start("Game");
			})
			.on("pointerout", () => {
				this.play.setTexture("play-button-inactive");
			})
			.on("pointerup", () => {
				this.play.setTexture("play-button-inactive");
			});

		this.credits = this.add
			.sprite(400, 400, "credits-button-inactive")
			.setScale(0.5)
			.setInteractive()
			.on("pointerdown", () => {
				this.credits.setTexture("credits-button-active");
				this.scene.start("Credits");
			})
			.on("pointerout", () => {
				this.credits.setTexture("credits-button-inactive");
			})
			.on("pointerup", () => {
				this.credits.setTexture("credits-button-inactive");
			});

		this.events.on("destroy", () => {});
	}

	update() {}

	destroy() {
		this.play.removeAllListeners();
		this.credits.removeAllListeners();
	}
}
