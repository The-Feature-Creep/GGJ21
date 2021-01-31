export const TREE_IMAGES_KEY = "tree";
import { Obstacles } from "./obstacles";
export class Tree extends Obstacles {
  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    textureURL: string
  ) {
    super(scene, xPosition, yPosition, textureURL);
  }
}
