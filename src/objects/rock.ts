export const ROCK_IMG_KEY = "rock";
export const ROCK_HIDE_IMG_KEY = "rock-hide";

import { Obstacles } from "./obstacles";
export class Rock extends Obstacles {
	constructor(
		scene: Phaser.Scene,
		xPosition: number,
		yPosition: number,
		textureURL: string
	) {
		super(scene, xPosition, yPosition, textureURL);
		this.animations(scene);
	}

	private animations(scene: Phaser.Scene) {
		scene.anims.create({
			key: ROCK_HIDE_IMG_KEY,
			frames: [{ key: ROCK_HIDE_IMG_KEY, frame: 0 }],
			frameRate: 10,
			repeat: -1,
		});

		scene.anims.create({
			key: ROCK_IMG_KEY,
			frames: [{ key: ROCK_IMG_KEY, frame: 0 }],
			frameRate: 10,
			repeat: -1,
		});
	}
}
