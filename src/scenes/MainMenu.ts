import PlayInactive from "../assets/main-menu/play-inactive.svg";
import PlayActive from "../assets/main-menu/play-active.svg";

import CreditsInactive from "../assets/main-menu/credits-inactive.svg";
import CreditsActive from "../assets/main-menu/credits-active.svg";

export class MainMenuScene extends Phaser.Scene {
	play;
	credits;
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
		const play = this.add
			.sprite(400, 200, "play-button-inactive")
			.setScale(0.5)
			.setInteractive()
			.on("pointerdown", () => {
				play.setTexture("play-button-active");
				this.scene.start("Game");
			})
			.on("pointerout", () => {
				play.setTexture("play-button-inactive");
			})
			.on("pointerup", () => {
				play.setTexture("play-button-inactive");
			});

		const credits = this.add
			.sprite(400, 400, "credits-button-inactive")
			.setScale(0.5)
			.setInteractive()
			.on("pointerdown", () => {
				credits.setTexture("credits-button-active");
				this.scene.start("Credits");
			})
			.on("pointerout", () => {
				credits.setTexture("credits-button-inactive");
			})
			.on("pointerup", () => {
				credits.setTexture("credits-button-inactive");
			});

		this.events.on("destroy", () => {
			play.removeAllListeners();
			credits.removeAllListeners();
		});
	}

	update() {}
}
