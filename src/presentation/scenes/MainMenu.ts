import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    music: Phaser.Sound.BaseSound;
    bannerLvlOne: GameObjects.Image;
    bannerLvlTwo: GameObjects.Image;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

        this.logo = this.add.image(360, 250, 'logo');

        this.music = this.sound.add('backgroundMusic', { loop: true });
        this.music.play();

        this.bannerLvlOne = this.add.image(360, 650, 'levelOneBtn')
        .setDisplaySize(600, 275);

        const levelOneButton = this.add.text(105, 680, 'ATRAPAR', {
            fontFamily: 'square', fontSize: 42, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0, 0);

        const levelOneButtonHitArea = this.add.graphics();
        levelOneButtonHitArea.fillStyle(0x000000, 0); // Color negro con 0 de opacidad (invisible)
        levelOneButtonHitArea.fillRect(70, 680, 200, levelOneButton.height);
        levelOneButtonHitArea.setInteractive(new Phaser.Geom.Rectangle(70, 680, 200, levelOneButton.height), Phaser.Geom.Rectangle.Contains);

        levelOneButtonHitArea.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('Game', { level: 1 });
        });
    }
}
