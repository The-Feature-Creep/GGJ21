import { GameScene } from "./../scenes/Game";
export const config = {
	type: Phaser.AUTO,
	parent: "GGJ21",
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
	backgroundColor: "#2d2d2d",
	scene: GameScene,
};
