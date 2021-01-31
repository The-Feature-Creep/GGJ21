import { GUARD_IMG_KEY, Guard } from "./../objects/guard";
import { SPOTLIGHT_IMG_KEY, Spotlight } from "../objects/spotlight";
import { Ground, GROUND_IMAGES_KEY } from "./../objects/ground";
import { TREE_IMAGES_KEY, Tree } from "../objects/tree";
import { ROCK_IMAGES_KEY, Rock } from "../objects/rock";
import { PLAYER_IMAGES_KEY, Player } from "../objects/player";
import CharacterImg from "../assets/prisoner.png";
import PlatformImg from "../assets/ground.png";
import RockImg from "../assets/rock.png";
import HideRock from "../assets/rock-hidden.png";
import TreeImg from "../assets/tree.png";
import HideTreeImg from "../assets/tree-hidden.png";
import GuardImg from "./../assets/guard.png";
import SpotlightImg from "../assets/spotlight.png";
import { Shovel } from "./../objects/shovel";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private rock: Rock;
  private tree: Tree;
  private ground: Ground;
  private guards: Guard[] = [];
  private spotlight: Spotlight;
  private shovel: Shovel;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private controls: Phaser.Cameras.Controls.SmoothedKeyControl;
  constructor() {
    super("Game");
  }
  preload() {
    this.load.image(GUARD_IMG_KEY, GuardImg);
    this.load.image(SPOTLIGHT_IMG_KEY, SpotlightImg);
    this.load.spritesheet(PLAYER_IMAGES_KEY, CharacterImg, {
      frameWidth: 100,
      frameHeight: 119,
    });
    this.load.image(GROUND_IMAGES_KEY, PlatformImg);
    this.load.spritesheet(ROCK_IMAGES_KEY, RockImg, {
      frameWidth: 148,
      frameHeight: 100,
    });
    this.load.spritesheet("hide-rock", HideRock, {
      frameWidth: 148,
      frameHeight: 100,
    });
    this.load.spritesheet(TREE_IMAGES_KEY, TreeImg, {
      frameWidth: 231,
      frameHeight: 435,
    });
    this.load.spritesheet("hide-tree", HideTreeImg, {
      frameWidth: 231,
      frameHeight: 425,
    });
  }

  create() {
    this.spotlight = new Spotlight(this, 100, 100);
    this.guards.push(new Guard(this, 100, 425));
    this.ground = new Ground(this, 500, 480, GROUND_IMAGES_KEY);
    this.rock = new Rock(this, 300, 425, ROCK_IMAGES_KEY);
    this.tree = new Tree(this, 600, 315, TREE_IMAGES_KEY);
    this.player = new Player(this, 100, 300, PLAYER_IMAGES_KEY);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.rock, this.ground);
    this.physics.add.collider(this.tree, this.ground);

    this.cursors = this.input.keyboard.createCursorKeys();

<<<<<<< Updated upstream
    // const controlConfig = {
    //   camera: this.cameras.main,
    //   left: this.cursors.left,
    //   right: this.cursors.right,
    //   speed: 0.1,
    // };
    // this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
    //   controlConfig
    // );
    // this.cameras.main.setBounds(0, 0, this.ground.x, 0);
=======
		this.physics.add.overlap(this.spotlight.sprite, this.player, (onCollide) => {
			this.spotlightCollideWithPlayer();
		});
>>>>>>> Stashed changes

    // Implement with tilemaps or try making character static ELSE. make scene move fixed distance every frame.

    //#region Anims
    this.anims.create({
      key: "hide-rock",
      frames: [{ key: "hide-rock", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: ROCK_IMAGES_KEY,
      frames: [{ key: ROCK_IMAGES_KEY, frame: 0 }],
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
      key: TREE_IMAGES_KEY,
      frames: [{ key: TREE_IMAGES_KEY, frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right-walk",
      frames: this.anims.generateFrameNumbers(PLAYER_IMAGES_KEY, {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "stand",
      frames: this.anims.generateFrameNumbers(PLAYER_IMAGES_KEY, {
        start: 0,
        end: 0,
      }),
      frameRate: 12,
      repeat: -1,
    });
    //#endregion
  }

  update(time, delta) {
    // this.controls.update(delta);

<<<<<<< Updated upstream
    this.spotlight.update();
    this.guards.forEach((guard) => {
      guard.updatePosition();
    });
    if (this.cursors.left.isDown) {
      this.player.setScale(-1, this.player.scaleY);
      this.player.anims.play("right-walk", true);
      this.player.setVelocityX(-180);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(180);
      this.player.setScale(1, this.player.scaleY);
      this.player.anims.play("right-walk", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("stand", true);
    }
    if (this.cursors.up.isDown) {
      if (this.player.GetHiding) {
        if (this.physics.overlap(this.player, this.rock)) {
          this.unhide(ROCK_IMAGES_KEY);
        }
      } else {
        if (this.physics.overlap(this.player, this.tree)) {
          this.hide(TREE_IMAGES_KEY);
        }
      }
    } else if (this.cursors.down.isDown) {
      if (this.player.GetHiding) {
        if (this.physics.overlap(this.player, this.tree)) {
          this.unhide(TREE_IMAGES_KEY);
        }
      } else {
        if (this.physics.overlap(this.player, this.rock)) {
          this.hide(ROCK_IMAGES_KEY);
        }
      }
    }
  }
  private hide(object: string) {
    switch (object) {
      case "rock":
        this.player.setVisible(false);
        this.rock.anims.play("hide-rock", true);
        this.player.SetHiding = true;
        return;
      case "tree":
        this.player.setVisible(false);
        this.tree.anims.play("hide-tree", true);
        this.player.SetHiding = true;
        return;

      default:
        break;
    }
  }
  private unhide(object: string) {
    switch (object) {
      case "rock":
        this.player.setVisible(true);
        this.rock.anims.play(ROCK_IMAGES_KEY, true);
        this.player.SetHiding = false;
        return;
      case "tree":
        this.player.setVisible(true);
        this.tree.anims.play(TREE_IMAGES_KEY, true);
        this.player.SetHiding = false;
        return;
=======
	spotlightCollideWithPlayer() {
		if (this.timeInBeam >= 35) {
			console.log("Gane Ends");
		} else if (!this.player.isHidden) {
			this.timeInBeam += 1;
		}
	}
	update(time, delta) {
		// this.controls.update(delta);
		if (this.player.body.touching.none) {
			this.timeInBeam = 0;
		}
		this.spotlight.update();
		this.guards.forEach((guard) => {
			guard.updatePosition();
		});
		if (this.cursors.left.isDown) {
			this.player.setScale(-1, this.player.scaleY);
			this.player.anims.play(PLAYER_WALK_CYCLE, true);
			this.player.setVelocityX(-180);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(180);
			this.player.setScale(1, this.player.scaleY);
			this.player.anims.play(PLAYER_WALK_CYCLE, true);
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play(PLAYER_STATIONARY_CYCLE, true);
		}
		if (this.cursors.up.isDown) {
			if (this.player.GetHiding) {
				if (this.physics.overlap(this.player, this.rock)) {
					this.unhide(ROCK_IMG_KEY);
				}
			} else {
				if (this.physics.overlap(this.player, this.tree)) {
					this.hide(TREE_IMG_KEY);
				}
			}
		} else if (this.cursors.down.isDown) {
			if (this.player.GetHiding) {
				if (this.physics.overlap(this.player, this.tree)) {
					this.unhide(TREE_IMG_KEY);
				}
			} else {
				if (this.physics.overlap(this.player, this.rock)) {
					this.hide(ROCK_IMG_KEY);
				}
			}
		}
	}
	private hide(object: string) {
		switch (object) {
			case "rock":
				this.player.disableBody(true);
				this.rock.anims.play(ROCK_HIDE_IMG_KEY, true);
				this.player.SetHiding = true;
				return;
			case "tree":
				this.player.disableBody(true);
				this.tree.anims.play(TREE_HIDE_IMG_KEY, true);
				this.player.SetHiding = true;
				return;

			default:
				break;
		}
	}
	private unhide(object: string) {
		switch (object) {
			case "rock":
				this.player.enableBody(false, this.player.x, this.player.y, true, true);
				this.rock.anims.play(ROCK_IMG_KEY, true);
				this.player.SetHiding = false;
				return;
			case "tree":
				this.player.enableBody(false, this.player.x, this.player.y, true, true);
				this.tree.anims.play(TREE_IMG_KEY, true);
				this.player.SetHiding = false;
				return;
>>>>>>> Stashed changes

      default:
        break;
    }
  }
}
