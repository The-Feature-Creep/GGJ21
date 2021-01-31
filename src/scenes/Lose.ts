import BackDefault from "../assets/ui/buttons/back/back-default.svg";
import BackHover from "../assets/ui/buttons/back/back-hover.svg";
import BackClick from "../assets/ui/buttons/back/back-click.svg";

export class GameScene extends Phaser.Scene {
  back: Phaser.GameObjects.Sprite;
  constructor() {
    super("Win");
  }
  preload() {
    this.load.image("back-button-default", BackDefault);
    this.load.image("back-button-hover", BackHover);
    this.load.image("back-button-click", BackClick);
  }

  create() {
    this.back = this.add
      .sprite(500, 450, "back-button-default")
      .setInteractive()
      .on("pointerdown", () => {
        this.back.setTexture("back-button-click");
      })
      .on("pointerup", () => {
        this.back.setTexture("back-button-default");
        this.scene.start("MainMenu");
      })
      .on("pointerover", () => {
        this.back.setTexture("back-button-hover");
      })
      .on("pointerout", () => {
        this.back.setTexture("back-button-default");
      });

    this.events.on("destroy", this.destroy);
  }
  update(time, delta) {}

  destroy() {
    this.back.removeAllListeners();
  }
}
