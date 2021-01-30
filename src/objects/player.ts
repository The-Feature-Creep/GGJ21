export class Player {
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private isHidden: boolean = false;
  private equipment: Phaser.GameObjects.Sprite;

  constructor() {}

  get GetSprite() {
    return this.sprite;
  }
  get GetHidding() {
    return this.isHidden;
  }
  get GetEquipment() {
    return this.equipment;
  }

  set SetSprite(
    playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {
    this.sprite = playerSprite;
  }
  set SetHidding(isHidding: boolean) {
    this.isHidden = isHidding;
  }
}
