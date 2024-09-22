import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(1280, 720, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(360, 700, 450, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(360, 700, 450, 32, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 450px wide, so 100% = 450px)
            bar.width = 4 + (450 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');

        this.load.image('levelOneBtn', 'buttons/level_one_btn.png');

        this.load.image('lvlOneBackground', 'backgrounds/lvl_one_bg.webp');

        this.load.image('lvlTwoBackground', 'backgrounds/lvl_two_bg.webp');

        this.load.image('lvlOneTarget', 'items/targets/apple.png');

        this.load.image('lvlTwoTarget', 'items/targets/soccer_ball.png');

        this.load.image('lvlOnePoison', 'items/poisons/squirrel.png');

        this.load.image('lvlTwoPoison', 'items/poisons/soccer_shoe.png');

        this.load.image('lvlOneCatcher', 'player/skin/bucket.png');

        this.load.image('lvlTwoCatcher', 'player/skin/soccer_gloves.png');

        this.load.audio('backgroundMusic', 'sound/music/menu_music.wav');
        
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}