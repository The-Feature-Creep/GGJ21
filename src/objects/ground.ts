export const GROUND_IMAGES_KEY = "ground";

import { Terrain } from "./terrain";

export class Ground extends Terrain {
  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    textureURL: string
  ) {
    super(scene, xPosition, yPosition, textureURL);
  }
}
