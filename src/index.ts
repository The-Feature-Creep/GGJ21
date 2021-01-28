import Phaser from 'phaser';
import CharacterImg from './assets/character.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image('char', CharacterImg);
    }
      
    create ()
    {
        const player = this.add.image(400, 450, 'char');
        player.scale = 0.8;
      
        /*this.tweens.add({
            targets: char,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });*/
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
