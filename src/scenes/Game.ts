import { Fence } from "./../objects/fence";
import { GUARD_IMG_KEY, GUARD_2_IMG_KEY, Guard } from "./../objects/guard";
import { SPOTLIGHT_IMG_KEY, Spotlight } from "./../objects/spotlight";
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
import { LOSE_SCENE_KEY } from "./Lose";
import CharacterImg from "./../assets/prisoner.png";
import CharacterImgLeft from "./../assets/prisoner-left.png";
import RockImg from "./../assets/rock.png";
import HideRock from "./../assets/rock-hidden.png";
import TreeImg from "./../assets/tree.png";
import HideTreeImg from "../assets/tree-hidden.png";
import GuardImg from "./../assets/guard1.png";
import GuardImg2 from "./../assets/guard2.png";
import SpotlightImg from "../assets/spotlight.png";
import FenceEndImg from "./../assets/fence-end.png";
import { Shovel, SHOVEL_IMG_KEY, SAND_PILE_IMG_KEY } from "./../objects/shovel";
import ShovelImg from "./../assets/sandpile-with-spade.png";
import SandPileImg from "./../assets/sandpile.png";
import { Terrain } from "../objects/terrain";
import WallTileImg from "../assets/fence-repeat.png";
import { WallTileSprite, WALL_TILE_IMG_KEY } from "../objects/wall-tile";

export class GameScene extends Phaser.Scene {
	private player: Player;
	private rock: Rock;
	private tree: Tree;
	private terrain: Terrain;
	private guards: Guard[] = [];
	private fence: Fence;
	private spotlight: Spotlight;
	private shovel: Shovel;
	private timeInBeam: number = 0;
	private wallTileSprite: WallTileSprite;

	private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	constructor() {
		super("Game");
	}
	preload() {
		this.load.image(WALL_TILE_IMG_KEY, WallTileImg);
		// this.load.image(GUARD_IMG_KEY, GuardImg);
		this.load.image(SAND_PILE_IMG_KEY, SandPileImg);
		this.load.image(SHOVEL_IMG_KEY, ShovelImg);
		this.load.image(SPOTLIGHT_IMG_KEY, SpotlightImg);
		this.load.image("char", CharacterImg);
		this.load.image("fence-end", FenceEndImg);
		this.load.spritesheet(GUARD_IMG_KEY, GuardImg, {
			frameWidth: 98.5,
			frameHeight: 144,
		});
		this.load.spritesheet(GUARD_2_IMG_KEY, GuardImg2, {
			frameWidth: 98.5,
			frameHeight: 144,
		});
		this.load.spritesheet(PLAYER_IMG_KEY, CharacterImg, {
			frameWidth: 103,
			frameHeight: 119.5,
		});
		this.load.spritesheet(PLAYER_WALK_CYCLE_LEFT, CharacterImgLeft, {
			frameWidth: 103,
			frameHeight: 119.5,
		});
		this.load.spritesheet(PLAYER_WALK_SHOVEL_CYCLE_LEFT, CharacterImgLeft, {
			frameWidth: 103,
			frameHeight: 119.5,
		});
		this.load.spritesheet(PLAYER_WALK_SHOVEL_CYCLE, CharacterImg, {
			frameWidth: 103,
			frameHeight: 119.5,
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
		this.guards.length = 0;
		this.shovel = new Shovel(this, 800, 445);
		this.spotlight = new Spotlight(this, 100, 100);
		this.guards.push(new Guard(this, 600, 300));
		this.terrain = new Terrain(this, 500, 550);
		this.rock = new Rock(this, 300, 470, ROCK_IMG_KEY);
		this.tree = new Tree(this, 600, 375, TREE_IMG_KEY);
		this.player = new Player(this, 125, 400, PLAYER_IMG_KEY);
		this.fence = new Fence(this, 900, 380);
		this.add.image(510, 380, "fence-end").setDepth(-1);

		this.cameras.cameras[0].startFollow(this.player);
		this.cameras.cameras[0].setFollowOffset(this.player.x, 150);

		this.wallTileSprite = new WallTileSprite(this, -253, 435, 600, 150);

		this.guards.forEach((guard) => {
			this.physics.add.collider(guard, this.terrain); // makes guard collide with terrain
		});
		this.physics.add.collider(this.player, this.fence);
		this.physics.add.collider(this.player, this.terrain);

		this.physics.add.overlap(this.shovel, this.player, (onCollide) => {
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
	}

	shovelCollideWithPlayer() {
		this.player.hasShovel = true;
		this.shovel.setTexture(SAND_PILE_IMG_KEY);
	}

	spotlightCollideWithPlayer() {
		if (this.timeInBeam >= 35) {
			this.callLoseScene();
		} else if (!this.player.isHidden) {
			this.timeInBeam += 1;
		}
	}

	callLoseScene() {
		this.scene.launch(LOSE_SCENE_KEY, {
			sceneContext: this,
		});
		this.scene.pause();
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
				this.callLoseScene();
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
					this.player.anims.play(PLAYER_WALK_CYCLE, true);
					this.player.setVelocityX(-180);
					this.player.setFlipX(true);
				} else if (this.cursors.right.isDown) {
					this.player.setVelocityX(180);
					this.player.anims.play(PLAYER_WALK_CYCLE, true);
					this.player.setFlipX(false);
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
