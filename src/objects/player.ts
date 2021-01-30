export class Player {
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private isHidden: boolean;
  private equipment: Phaser.GameObjects.Sprite;

  constructor(
    private playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    private isHidding: boolean,
    private playerEquipment: Phaser.GameObjects.Sprite
  ) {
    this.sprite = playerSprite;
    this.isHidden = isHidding;
    this.equipment = playerEquipment;
  }

  get GetSprite() {
    return this.sprite;
  }
  get GetHidding() {
    return this.isHidden;
  }
  get GetEquipment() {
    return this.equipment;
  }

  set SetHidding(isHidding: boolean) {
    this.isHidden = isHidding;
  }
}
