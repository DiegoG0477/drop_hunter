import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;
    score: number;
    duration: string;

    constructor ()
    {
        super('GameOver');
    }

    init(data: { score: number, duration: string }){
        this.score = data.score;
        this.duration = data.duration;
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

        this.gameover_text = this.add.text(360, 384, 'Game Over!', {
            fontFamily: 'square', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.add.text(360, 512, `Score: ${this.score}`, {
            fontFamily: 'square', fontSize: 45, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(360, 600, `Duration: ${this.duration}`, {
            fontFamily: 'square', fontSize: 45, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
