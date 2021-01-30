import { Obstacles } from "./obstacles";
export class Tree extends Obstacles {
  constructor(
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    type: string
  ) {
    super(sprite, type);
  }
}
