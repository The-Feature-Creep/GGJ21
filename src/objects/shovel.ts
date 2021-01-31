import { Obstacles } from "./obstacles";
export const SHOVEL_IMG_KEY = "shovel";
export const SAND_PILE_IMG_KEY = "sand-pile";
export class Shovel extends Obstacles {
	constructor(scene: Phaser.Scene, startingX: number, startingY: number) {
		super(scene, startingX, startingY, SHOVEL_IMG_KEY);
		scene.add.existing(this);
	}
}
