import Phaser from "phaser";
import { GameScene } from "./scenes/Game";
import { MainMenuScene } from "./scenes/MainMenu";
import { CreditScene } from "./scenes/Credits";
import { LoseScene } from "./scenes/Lose";

export const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 1000,
	height: 500,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: true,
		},
	},
	backgroundColor: "#633CA6",
	scene: [MainMenuScene, CreditScene, GameScene, LoseScene],
};

const game = new Phaser.Game(config);
