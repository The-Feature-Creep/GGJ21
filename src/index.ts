import Phaser from "phaser";
import { GameScene } from "./scenes/Game";

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 800,
	height: 600,
	scene: GameScene,
};

const game = new Phaser.Game(config);
