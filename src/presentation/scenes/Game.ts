import { Scene } from 'phaser';
import { Catcher } from '@domain/entities/Catcher';

export class Game extends Scene
{
    background: Phaser.GameObjects.Image;
    poison: Phaser.GameObjects.Image;
    target: Phaser.GameObjects.Image;
    catcher: Phaser.Physics.Arcade.Image;
    level: number;

    constructor ()
    {
        super('Game');
    }

    init(data: { level: number }) {
        this.level = data.level; 
    }

    create ()
    {
        let lvlBackgroundStr = "";
        let lvlTargetStr = "";
        let lvlPoisonStr = "";
        let lvlCatcherStr = "";
        switch(this.level){
            case 1:
                lvlBackgroundStr = 'lvlOneBackground';
                lvlTargetStr = 'lvlOneTarget';
                lvlPoisonStr = 'lvlOnePoison';
                lvlCatcherStr = 'lvlOneCatcher';
                break;
            case 2:
                lvlBackgroundStr = 'lvlTwoBackground';
                lvlTargetStr = 'lvlTwoTarget';
                lvlPoisonStr = 'lvlTwoPoison';
                lvlCatcherStr = 'lvlTwoCatcher';
                break;
        }

        this.background = this.add.image(0, 0, lvlBackgroundStr)
        .setOrigin(0, 0)
        .setDisplaySize(this.scale.width, this.scale.height);

        this.target = this.add.image(360, 100, lvlTargetStr);

        this.poison = this.add.image(360, 300, lvlPoisonStr);

        this.catcher = this.physics.add.image(360, 1200, lvlCatcherStr)
            .setOrigin(0.5, 0.5)
            .setDisplaySize(120, 120)
            .setCollideWorldBounds(true);

        const catcher = new Catcher('0', lvlCatcherStr, 3, 0, 850);

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            const deltaX = pointer.x - this.catcher.x;
            const targetX = pointer.x;

            if (Math.abs(deltaX) > catcher.maxSpeed * this.game.loop.delta / 1000) {
            this.catcher.x += Math.sign(deltaX) * catcher.maxSpeed * this.game.loop.delta / 1000;
            } else {
            this.catcher.x = targetX;
            }
        });
    }
}