import { Boot } from './presentation/scenes/Boot';
import { Game as MainGame } from './presentation/scenes/Game';
import { GameOver } from './presentation/scenes/GameOver';
import { MainMenu } from './presentation/scenes/MainMenu';
import { Preloader } from './presentation/scenes/Preloader';

import { Game, Types } from "phaser";

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 720,
    height: 1280,
    parent: 'game-container',
    backgroundColor: '#178E43',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

export default new Game(config);
