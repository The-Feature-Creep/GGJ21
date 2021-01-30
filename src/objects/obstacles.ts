export class Obstacles {
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private type: string;

  constructor(
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    type: string
  ) {
    this.sprite = sprite;
    this.type = type;
  }

  public get GetSprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this.sprite;
  }

  public get GetType(): string {
    return this.type;
  }
}
