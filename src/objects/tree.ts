export const TREE_IMG_KEY = "tree";
export const TREE_HIDE_IMG_KEY = "tree-hide";

import { Obstacles } from "./obstacles";
export class Tree extends Obstacles {
  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    textureURL: string
  ) {
    super(scene, xPosition, yPosition, textureURL);
    this.body.setSize(100);
    this.animations(scene);
  }

  private animations(scene: Phaser.Scene) {
    scene.anims.create({
      key: TREE_HIDE_IMG_KEY,
      frames: [{ key: TREE_HIDE_IMG_KEY, frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: TREE_IMG_KEY,
      frames: [{ key: TREE_IMG_KEY, frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
  }
}
