import PlayDefault from "../assets/main-menu/play-default.svg";
import PlayHover from "../assets/main-menu/play-hover.svg";
import PlayClick from "../assets/main-menu/play-click.svg";

import CreditsDefault from "../assets/main-menu/credits-default.svg";
import CreditsHover from "../assets/main-menu/credits-hover.svg";
import CreditsClick from "../assets/main-menu/credits-click.svg";

export class MainMenuScene extends Phaser.Scene {
	play: Phaser.GameObjects.Sprite;
	credits: Phaser.GameObjects.Sprite;
	constructor() {
		super("MainMenu");
	}

	preload() {
		this.load.image("play-button-default", PlayDefault);
		this.load.image("play-button-hover", PlayHover);
		this.load.image("play-button-click", PlayClick);

		this.load.image("credits-button-default", CreditsDefault);
		this.load.image("credits-button-hover", CreditsHover);
		this.load.image("credits-button-click", CreditsClick);
	}

	create() {
		this.play = this.add
			.sprite(150, 475, "play-button-default")
			.setInteractive()
			.on("pointerdown", () => {
				this.play.setTexture("play-button-click");
			})
			.on("pointerup", () => {
				this.play.setTexture("play-button-default");
				this.scene.start("Game");
			})
			.on("pointerover", () => {
				this.play.setTexture("play-button-hover");
			})
			.on("pointerout", () => {
				this.play.setTexture("play-button-default");
			});

		this.credits = this.add
			.sprite(150, 525, "credits-button-default")
			.setInteractive()
			.on("pointerdown", () => {
				this.credits.setTexture("credits-button-click");
			})
			.on("pointerup", () => {
				this.credits.setTexture("credits-button-default");
				this.scene.start("Credits");
			})
			.on("pointerover", () => {
				this.credits.setTexture("credits-button-hover");
			})
			.on("pointerout", () => {
				this.credits.setTexture("credits-button-default");
			});

		this.events.on("destroy", this.destroy);
	}

	update() {}

	destroy() {
		this.play.removeAllListeners();
		this.credits.removeAllListeners();
	}
}
