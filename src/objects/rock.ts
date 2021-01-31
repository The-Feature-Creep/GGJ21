export const ROCK_IMAGES_KEY = "rock";
import { Obstacles } from "./obstacles";
export class Rock extends Obstacles {
  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    textureURL: string
  ) {
    super(scene, xPosition, yPosition, textureURL);
  }
}
