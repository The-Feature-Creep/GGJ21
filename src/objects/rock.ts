import { Obstacles } from "./obstacles";
export class Rock extends Obstacles {
  constructor(
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    type: string
  ) {
    super(sprite, type);
  }
}
