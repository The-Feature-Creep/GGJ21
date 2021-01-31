export const BUSH_IMAGES_KEY = "tree";
import { Obstacles } from "./obstacles";
export class Bush extends Obstacles {
  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    textureURL: string
  ) {
    super(scene, xPosition, yPosition, textureURL);
  }
}
