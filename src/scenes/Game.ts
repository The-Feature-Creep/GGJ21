import { Player } from "../objects/player";
import CharacterImg from "../assets/prisoner.png";
import PlatformImg from "../assets/platform.png";
import BushImg from "../assets/character.png";
import RockImg from "../assets/character.png";
import TreeImg from "../assets/character.png";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private ground: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;

  private obstacles: Phaser.GameObjects.Group;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("demo");
  }

  preload() {
    this.load.image("char", CharacterImg);
    this.load.image("platform", PlatformImg);
    this.load.image("bush", BushImg);
    this.load.image("rock", RockImg);
    this.load.image("tree", TreeImg);
  }

  create() {
    this.ground = this.physics.add
      .staticSprite(400, 600, "platform")
      .refreshBody();
    this.ground.scaleY = 0.1;

    const playerSprite = this.physics.add
      .sprite(100, 450, "char")
      .setBounce(0.2)
      .setCollideWorldBounds(true);
    this.player.SetSprite(playerSprite);

    this.obstacles = this.add.group();
    let bush: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.obstacles.create(
      300,
      450,
      "bush"
    );
    let rock: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.obstacles.create(
      400,
      450,
      "rock"
    );
    let tree: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.obstacles.create(
      600,
      450,
      "tree"
    );

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(bush, this.ground);
    this.physics.add.collider(rock, this.ground);
    this.physics.add.collider(tree, this.ground);
    this.physics.add.collider(this.player, bush);
    this.physics.add.collider(this.player, rock);
    this.physics.add.collider(this.player, tree);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-180);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(180);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-360);
    }
  }
}
