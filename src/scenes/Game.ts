import { Fence } from "./../objects/fence";
import { GUARD_IMG_KEY, Guard } from "./../objects/guard";
import { SPOTLIGHT_IMG_KEY, Spotlight } from "./../objects/spotlight";
import { Ground, GROUND_IMAGES_KEY } from "./../objects/ground";
import { TREE_IMG_KEY, TREE_HIDE_IMG_KEY, Tree } from "./../objects/tree";
import { ROCK_IMG_KEY, ROCK_HIDE_IMG_KEY, Rock } from "./../objects/rock";
import {
  PLAYER_IMG_KEY,
  PLAYER_WALK_CYCLE,
  PLAYER_WALK_CYCLE_LEFT,
  PLAYER_WALK_SHOVEL_CYCLE,
  PLAYER_WALK_SHOVEL_CYCLE_LEFT,
  PLAYER_STATIONARY_CYCLE,
  PLAYER_STATIONARY_SHOVEL_CYCLE,
  Player,
} from "./../objects/player";
import CharacterImg from "./../assets/prisoner.png";
import CharacterImgLeft from "./../assets/prisoner-left.png";
import PlatformImg from "./../assets/ground.png";
import RockImg from "./../assets/rock.png";
import HideRock from "./../assets/rock-hidden.png";
import TreeImg from "./../assets/tree.png";
import HideTreeImg from "../assets/tree-hidden.png";
import GuardImg from "./../assets/guard1.png";
import SpotlightImg from "../assets/spotlight.png";
import FenceEndImg from "./../assets/fence-end.png";
import { Shovel, SHOVEL_IMAGE_KEY } from "./../objects/shovel";
import ShovelImg from "./../assets/sandpile-with-spade.png";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private rock: Rock;
  private tree: Tree;
  private ground: Ground;
  private guards: Guard[] = [];
  private fence: Fence;
  private spotlight: Spotlight;
  private shovel: Shovel;
  private timeInBeam: number = 0;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    super("Game");
  }
  preload() {
    // this.load.image(GUARD_IMG_KEY, GuardImg);
    this.load.image(SHOVEL_IMAGE_KEY, ShovelImg);
    this.load.image(SPOTLIGHT_IMG_KEY, SpotlightImg);
    this.load.image("char", CharacterImg);
    this.load.image(GROUND_IMAGES_KEY, PlatformImg);
    this.load.image("fence-end", FenceEndImg);
    this.load.spritesheet(GUARD_IMG_KEY, GuardImg, {
      frameWidth: 98,
      frameHeight: 144,
    });
    this.load.spritesheet(PLAYER_IMG_KEY, CharacterImg, {
      frameWidth: 100,
      frameHeight: 119,
    });
    this.load.spritesheet(PLAYER_WALK_CYCLE_LEFT, CharacterImgLeft, {
      frameWidth: 100,
      frameHeight: 119,
    });
    this.load.spritesheet(PLAYER_WALK_SHOVEL_CYCLE_LEFT, CharacterImgLeft, {
      frameWidth: 100,
      frameHeight: 119,
    });
    this.load.spritesheet(PLAYER_WALK_SHOVEL_CYCLE, CharacterImg, {
      frameWidth: 100,
      frameHeight: 119,
    });
    this.load.spritesheet(ROCK_IMG_KEY, RockImg, {
      frameWidth: 148,
      frameHeight: 100,
    });
    this.load.spritesheet(ROCK_HIDE_IMG_KEY, HideRock, {
      frameWidth: 148,
      frameHeight: 100,
    });
    this.load.spritesheet(TREE_IMG_KEY, TreeImg, {
      frameWidth: 231,
      frameHeight: 435,
    });
    this.load.spritesheet(TREE_HIDE_IMG_KEY, HideTreeImg, {
      frameWidth: 231,
      frameHeight: 425,
    });
  }

  create() {
    this.shovel = new Shovel(this, 800, 395);
    this.spotlight = new Spotlight(this, 100, 100);
    this.guards.push(new Guard(this, 100, 300));
    this.ground = new Ground(this, 500, 480, GROUND_IMAGES_KEY);
    this.rock = new Rock(this, 300, 425, ROCK_IMG_KEY);
    this.tree = new Tree(this, 600, 315, TREE_IMG_KEY);
    this.player = new Player(this, 125, 300, PLAYER_IMG_KEY);
    this.fence = new Fence(this, 900, 350);
    this.add.image(510, 330, "fence-end").setDepth(-1);

    this.guards.forEach((guard) => {
      this.physics.add.collider(guard, this.ground); // makes guard collide with ground
    });
    this.physics.add.collider(this.player, this.fence);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.rock, this.ground);
    this.physics.add.collider(this.tree, this.ground);

    this.physics.add.overlap(this.shovel.sprite, this.player, (onCollide) => {
      this.shovelCollideWithPlayer();
    });

    this.physics.add.overlap(
      this.spotlight.sprite,
      this.player,
      (onCollide) => {
        this.spotlightCollideWithPlayer();
      }
    );

    this.cursors = this.input.keyboard.createCursorKeys();

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

    // Implement with tilemaps or try making character static ELSE. make scene move fixed distance every frame.
  }

  shovelCollideWithPlayer() {
    //character picks up shovel
    //shovel disappears
    this.player.hasShovel = true;
    this.shovel.sprite.disableBody(undefined, true);
  }

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
    } else {
      this.spotlight.update();
    }
    this.spotlight.update();
    this.guards.forEach((guard) => {
      guard.updatePosition();
      if (
        guard.canSeePlayer(
          this.player.x,
          this.player.y,
          this.player.getIsHidden
        )
      ) {
        console.log("Guard Can see you!");
      }
    });

    if (!this.player.getHasShovel) {
      if (this.player.isHidden) {
        if (this.cursors.up.isDown) {
          if (this.physics.overlap(this.player, this.rock)) {
            this.unhide(ROCK_IMG_KEY);
          }
        } else if (this.cursors.down.isDown) {
          if (this.physics.overlap(this.player, this.tree)) {
            this.unhide(TREE_IMG_KEY);
          }
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play(PLAYER_STATIONARY_CYCLE, true);
        }
      } else {
        if (this.cursors.left.isDown) {
          this.player.anims.play(PLAYER_WALK_CYCLE_LEFT, true);
          this.player.setVelocityX(-180);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(180);
          this.player.anims.play(PLAYER_WALK_CYCLE, true);
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play(PLAYER_STATIONARY_CYCLE, true);
        }
        if (this.cursors.up.isDown) {
          if (this.physics.overlap(this.player, this.tree)) {
            this.player.setVelocityX(0);
            this.hide(TREE_IMG_KEY);
          }
        } else if (this.cursors.down.isDown) {
          if (this.physics.overlap(this.player, this.rock)) {
            this.player.setVelocityX(0);
            this.hide(ROCK_IMG_KEY);
          }
        }
      }
    } else {
      if (this.player.isHidden) {
        if (this.cursors.up.isDown) {
          if (this.physics.overlap(this.player, this.rock)) {
            this.unhide(ROCK_IMG_KEY);
          }
        } else if (this.cursors.down.isDown) {
          if (this.physics.overlap(this.player, this.tree)) {
            this.unhide(TREE_IMG_KEY);
          }
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play(PLAYER_STATIONARY_SHOVEL_CYCLE, true);
        }
      } else {
        if (this.cursors.left.isDown) {
          this.player.anims.play(PLAYER_WALK_SHOVEL_CYCLE_LEFT, true);
          this.player.setVelocityX(-180);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(180);
          this.player.anims.play(PLAYER_WALK_SHOVEL_CYCLE, true);
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play(PLAYER_STATIONARY_SHOVEL_CYCLE, true);
        }

        if (this.cursors.up.isDown) {
          if (this.physics.overlap(this.player, this.tree)) {
            this.player.setVelocityX(0);
            this.hide(TREE_IMG_KEY);
          }
        } else if (this.cursors.down.isDown) {
          if (this.physics.overlap(this.player, this.rock)) {
            this.player.setVelocityX(0);
            this.hide(ROCK_IMG_KEY);
          }
        }
      }
    }
  }

  private hide(object: string) {
    switch (object) {
      case "rock":
        this.player.setVisible(false);
        this.rock.anims.play(ROCK_HIDE_IMG_KEY, true);
        this.player.setIsHidden = true;
        return;
      case "tree":
        this.player.setVisible(false);
        this.tree.anims.play(TREE_HIDE_IMG_KEY, true);
        this.player.setIsHidden = true;
        return;

      default:
        break;
    }
  }
  private unhide(object: string) {
    switch (object) {
      case "rock":
        this.player.setVisible(true);
        this.rock.anims.play(ROCK_IMG_KEY, true);
        this.player.setIsHidden = false;
        return;
      case "tree":
        this.player.setVisible(true);
        this.tree.anims.play(TREE_IMG_KEY, true);
        this.player.setIsHidden = false;
        return;

      default:
        break;
    }
  }
}
