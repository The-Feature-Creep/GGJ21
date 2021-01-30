import { Obstacles } from "./../objects/obstacles";
import { Tree } from "./../objects/tree";
import { Rock } from "./../objects/rock";
import { Player } from "../objects/player";
import CharacterImg from "../assets/prisoner.png";
import PlatformImg from "../assets/ground.png";
import RockImg from "../assets/rock.png";
import HideRock from "../assets/rock-hidden.png";
import TreeImg from "../assets/tree.png";
import HideTreeImg from "../assets/tree-hidden.png";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private playerObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private rock: Rock;
  private rockObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private tree: Tree;
  private treeObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private ground: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("char", CharacterImg);
    this.load.image("platform", PlatformImg);
    this.load.spritesheet("rock", RockImg, {
      frameWidth: 148,
      frameHeight: 100,
    });
    this.load.spritesheet("hide-rock", HideRock, {
      frameWidth: 148,
      frameHeight: 100,
    });
    this.load.spritesheet("tree", TreeImg, {
      frameWidth: 231,
      frameHeight: 285,
    });
    this.load.spritesheet("hide-tree", HideTreeImg, {
      frameWidth: 231,
      frameHeight: 285,
    });
  }

  create() {
    //#region Sprite Creation
    const rockSprite = this.physics.add
      .sprite(300, 425, "rock")
      .setImmovable(true)
      .setCollideWorldBounds(true);
    rockSprite.body.setAllowGravity(false);
    const treeSprite = this.physics.add
      .sprite(600, 425, "tree")
      .setImmovable(true)
      .setCollideWorldBounds(true);
    treeSprite.body.setAllowGravity(false);
    const playerSprite = this.physics.add
      .sprite(100, 600, "char")
      .setSize(100, 100)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    this.ground = this.physics.add
      .staticSprite(500, 480, "platform")
      .refreshBody();
    //#endregion

    this.rock = new Rock(rockSprite, "Rock");
    this.tree = new Tree(treeSprite, "Tree");
    this.player = new Player(playerSprite, false, false, false);
    this.rockObject = this.rock.GetSprite;
    this.playerObject = this.player.GetSprite;
    this.treeObject = this.tree.GetSprite;

    this.physics.add.collider(this.playerObject, this.ground);
    this.physics.add.collider(this.rockObject, this.ground);
    this.physics.add.collider(this.treeObject, this.ground);

    this.cursors = this.input.keyboard.createCursorKeys();

    //#region Anims
    this.anims.create({
      key: "hide-rock",
      frames: [{ key: "hide-rock", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "rock",
      frames: [{ key: "rock", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "hide-tree",
      frames: [{ key: "hide-tree", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "tree",
      frames: [{ key: "tree", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    //#endregion
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
      this.physics.overlap(this.playerObject, this.treeObject)
        ? this.hideController("Tree")
        : false;
    } else if (this.cursors.down.isDown) {
      this.physics.overlap(this.playerObject, this.rockObject)
        ? this.hideController("Rock")
        : false;
    }
  }
  private hideController(object: string) {
    switch (object) {
      case "Rock":
        if (!this.player.GetHiding) {
          this.playerObject.setVisible(false);
          this.rockObject.anims.play("hide-rock", true);
          this.player.SetHiding = true;
          return;
        } else {
          this.playerObject.setVisible(true);
          this.rockObject.anims.play("rock", true);
          this.player.SetHiding = false;
          return;
        }
      case "Tree":
        if (!this.player.GetHiding) {
          this.playerObject.setVisible(false);
          this.treeObject.anims.play("hide-tree", true);
          this.player.SetHiding = true;
          break;
        } else {
          this.playerObject.setVisible(true);
          this.treeObject.anims.play("tree", true);
          this.player.SetHiding = false;
          break;
        }

      default:
        break;
    }
  }
}
