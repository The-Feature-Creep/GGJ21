export const WALL_TILE_IMG_KEY = "wall-tile-sprite";

export class WallTileSprite extends Phaser.GameObjects.TileSprite {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		width: number,
		height: number,
		texture: string = WALL_TILE_IMG_KEY
	) {
		super(scene, x, y, width, height, texture);
		scene.add.tileSprite(x, y, width, height, texture).setDepth(-1);
	}
}
