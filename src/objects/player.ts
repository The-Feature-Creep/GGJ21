export class Player {
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private isHidden: boolean;
  private hasShovel: boolean;
  private shovelActive: boolean;

  constructor(
    playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    isHiding: boolean,
    shovel: boolean,
    usingShovel: boolean
  ) {
    this.sprite = playerSprite;
    this.isHidden = isHiding;
    this.hasShovel = shovel;
    this.shovelActive = usingShovel;
  }

  get GetSprite() {
    return this.sprite;
  }
  get GetHiding() {
    return this.isHidden;
  }
  get GetHasShovel() {
    return this.hasShovel;
  }
  get GetShovelActive() {
    return this.shovelActive;
  }

  set SetHiding(isHiding: boolean) {
    this.isHidden = isHiding;
  }
  set SetHasShovel(hasS: boolean) {
    this.hasShovel = hasS;
  }
  set SetShovelActive(isHiding: boolean) {
    this.isHidden = isHiding;
  }
}
