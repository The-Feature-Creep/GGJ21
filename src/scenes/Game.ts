import { Rock } from "./../objects/rock";
import { Player } from "../objects/player";
import CharacterImg from "../assets/prisoner.png";
import PlatformImg from "../assets/ground.png";
import RockImg from "../assets/rock.png";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private playerObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private rock: Rock;
  private rockObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private ground: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("char", CharacterImg);
    this.load.image("platform", PlatformImg);
    this.load.image("rock", RockImg);
  }

  create() {
    this.ground = this.physics.add
      .staticSprite(500, 480, "platform")
      .refreshBody();
    const playerSprite = this.physics.add
      .sprite(100, 600, "char")
      .setBounce(0.2)
      .setCollideWorldBounds(true);
    this.player = new Player(playerSprite, false, false, false);
    this.playerObject = this.player.GetSprite;

    const rockSprite = this.physics.add
      .sprite(300, 600, "rock")
      .setCollideWorldBounds(true);
    this.rock = new Rock(rockSprite, "Rock");
    this.rockObject = this.rock.GetSprite;

    this.physics.add.collider(this.playerObject, this.ground);
    this.physics.add.collider(this.rockObject, this.ground);

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
    if (this.cursors.up.isDown) {
      this.hideBehind();
      this.playerObject.disableBody(true, true);
    } else if (this.cursors.down.isDown) {
      this.playerObject.enableBody(
        false,
        this.playerObject.x,
        this.playerObject.y,
        true,
        true
      );
      console.log("down");
    }
  }

  hideBehind() {
    this.physics.add.overlap(this.playerObject, this.rockObject);
  }
}
