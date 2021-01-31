import BackDefault from "../assets/ui/buttons/back/back-default.svg";
import BackHover from "../assets/ui/buttons/back/back-hover.svg";
import BackClick from "../assets/ui/buttons/back/back-click.svg";
export const LOSE_SCENE_KEY = "Lose";
import { config } from "../";
import { GameScene } from "./Game";

export class LoseScene extends Phaser.Scene {
	back: Phaser.GameObjects.Sprite;
	sceneContext: Phaser.Scene;
	constructor() {
		super(LOSE_SCENE_KEY);
	}

	init(data: { sceneContext: GameScene }) {
		this.sceneContext = data.sceneContext;
		console.log(data);
	}

	preload() {
		this.load.image("back-button-default", BackDefault);
		this.load.image("back-button-hover", BackHover);
		this.load.image("back-button-click", BackClick);
	}

	create() {
		const rectangle = this.add.rectangle(
			config.width / 2,
			config.height / 2,
			config.width,
			config.height,
			0,
			0.5
		);

		this.add.text(
			rectangle.getCenter().x - 200,
			rectangle.getCenter().y - 200,
			`
		Congratulations!
		You're Garbage.
		Try again, noob.`,
			{
				fontSize: "40px",
			}
		);

		this.back = this.add
			.sprite(500, 450, "back-button-default")
			.setInteractive()
			.on("pointerdown", () => {
				this.back.setTexture("back-button-click");
			})
			.on("pointerup", () => {
				this.scene.stop();
				this.sceneContext.scene.start("MainMenu");
			})
			.on("pointerover", () => {
				this.back.setTexture("back-button-hover");
			})
			.on("pointerout", () => {
				this.back.setTexture("back-button-default");
			});

		this.events.on("destroy", this.destroy);
	}
	update(time, delta) {}

	destroy() {
		this.back.removeAllListeners();
	}
}
