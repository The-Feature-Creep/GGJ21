import { Shovel } from "./../objects/shovel";
import { Player } from "../objects/player";
import CharacterImg from "../assets/prisoner.png";
import PlatformImg from "../assets/platform.png";
import BushImg from "../assets/character.png";
import RockImg from "../assets/character.png";
import TreeImg from "../assets/character.png";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private playerObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private shovel: Shovel;
  private ground: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;

  private obstacles: Phaser.GameObjects.Group;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("char", CharacterImg);
    this.load.image("platform", PlatformImg);
    this.load.image("bush", BushImg);
    this.load.image("rock", RockImg);
    this.load.image("tree", TreeImg);
  }

  create() {
    const shovel = this.physics.add
      .sprite(100, 450, "bush")
      .setScale(0.1)
      .setBounce(0.2)
      .setCollideWorldBounds(true);
    const playerSprite = this.physics.add
      .sprite(100, 450, "char")
      .setBounce(0.2)
      .setCollideWorldBounds(true);
    this.player = new Player(playerSprite, false, shovel);
    this.playerObject = this.player.GetSprite;

    this.ground = this.physics.add
      .staticSprite(400, 600, "platform")
      .refreshBody();
    this.ground.scaleY = 0.1;

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

    this.physics.add.collider(this.playerObject, this.ground);
    this.physics.add.collider(bush, this.ground);
    this.physics.add.collider(rock, this.ground);
    this.physics.add.collider(tree, this.ground);
    this.physics.add.collider(this.playerObject, bush);
    this.physics.add.collider(this.playerObject, rock);
    this.physics.add.collider(this.playerObject, tree);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.playerObject.setVelocityX(-180);
    } else if (this.cursors.right.isDown) {
      this.playerObject.setVelocityX(180);
    } else {
      this.playerObject.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.playerObject.body.touching.down) {
      this.playerObject.setVelocityY(-360);
    }
  }
}
