import PlayDefault from "../assets/ui/buttons/play/play-default.svg";
import PlayHover from "../assets/ui/buttons/play/play-hover.svg";
import PlayClick from "../assets/ui/buttons/play/play-click.svg";

import CreditsDefault from "../assets/ui/buttons/credits/credits-default.svg";
import CreditsHover from "../assets/ui/buttons/credits/credits-hover.svg";
import CreditsClick from "../assets/ui/buttons/credits/credits-click.svg";

import WallTitleImage from "../assets/title.png";

import { config } from "../";

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

		this.load.image("wall-title-image", WallTitleImage);
	}

	create() {
		const image = this.add.image(config.width / 2, config.height / 2, "wall-title-image");
		this.play = this.add
			.sprite(config.width / 2, 400, "play-button-default")
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
			.sprite(config.width / 2, 450, "credits-button-default")
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
