import { config } from "../";
import BackDefault from "../assets/ui/buttons/back/back-default.svg";
import BackHover from "../assets/ui/buttons/back/back-hover.svg";
import BackClick from "../assets/ui/buttons/back/back-click.svg";
import GGJ2021 from "../assets/GGJ00_Logo_Light.png";

export class CreditScene extends Phaser.Scene {
	back: Phaser.GameObjects.Sprite;
	constructor() {
		super("Credits");
	}

	preload() {
		this.load.image("back-button-default", BackDefault);
		this.load.image("back-button-hover", BackHover);
		this.load.image("back-button-click", BackClick);
		this.load.image("GGJ2021-image", GGJ2021);
	}

	create() {
		const GGJ2020Image = this.add.image(config.width / 2 + 15, 100, "GGJ2021-image");
		GGJ2020Image.scale = 0.3;
		let GGJ2020ImageVector: Phaser.Math.Vector2;
		GGJ2020ImageVector = GGJ2020Image.getBottomLeft(undefined, true);
		console.log(GGJ2020ImageVector);
		const text = this.add.text(
			GGJ2020ImageVector.x - 185,
			GGJ2020ImageVector.y - 5,
			`
      This game was made in its entirety within 48 hours
      for Global Game Jame 2021.

      Programming:
      --------------------------------------------------
      Dane Brouwer
      Finn Brouwer
      Jonathan De Kock
      Philip Amwata
      Robert Shenton

      Art + Animation:
      --------------------------------------------------
      Robert Shenton
      `,
			{
				fontSize: "18px",
			}
		);
		const group = this.add.group(GGJ2020Image, text);

		this.add.tween({
			targets: group,
			ease: "Linear",
			duration: 5000,
			repeat: -1,
			onLoop: () => {
				group.setY(config.height, 2);
			},
		});
		this.back = this.add
			.sprite(500, 450, "back-button-default")
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
