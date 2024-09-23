import { Scene } from "phaser";
import { Catcher } from "@domain/entities/Catcher";
import { Poison } from "@domain/entities/Poison";
import { Target } from "@domain/entities/Target";
import { PhaserGameRepository } from "@framework/PhaserGameRepository";
import { StartSpawningUseCase } from "@application/use_cases/startSpawningUseCase";
import { EndSpawningUseCase } from "@application/use_cases/endSpawningUseCase";
import { Item } from "@domain/entities/Item";

export class Game extends Scene {
    private startSpawningUseCase: StartSpawningUseCase;
    private endSpawningUseCase: EndSpawningUseCase;
    background: Phaser.GameObjects.Image;
    poisons: Phaser.Physics.Arcade.Group;
    targets: Phaser.Physics.Arcade.Group;
    catcher: Phaser.Physics.Arcade.Image;
    catcherEntity: Catcher;
    poisonEntity: Poison;
    targetEntity: Target;
    level: number;
    spawnWorker: Worker;
    catcherSpeedWorker: Worker;

    constructor() {
        super("Game");
    }

    init(data: { level: number }) {
        this.level = data.level;
    }

    create() {
        const gameRepository = new PhaserGameRepository();

        let lvlBackgroundStr = "";
        let lvlCatcherStr = "";
        let lvlPoisonStr = "";
        let lvlTargetStr = "";
        switch (this.level) {
            case 1:
                lvlBackgroundStr = "lvlOneBackground";
                lvlCatcherStr = "lvlOneCatcher";
                lvlPoisonStr = "lvlOnePoison";
                lvlTargetStr = "lvlOneTarget";
                break;
            case 2:
                lvlBackgroundStr = "lvlTwoBackground";
                lvlCatcherStr = "lvlTwoCatcher";
                lvlPoisonStr = "lvlTwoPoison";
                lvlTargetStr = "lvlTwoTarget";
                break;
        }

        this.startSpawningUseCase = new StartSpawningUseCase(gameRepository);
        this.endSpawningUseCase = new EndSpawningUseCase(gameRepository);

        const catcherConfig = {
            id: "catcher",
            texture: lvlCatcherStr,
            lives: 8,
            score: 0,
            maxSpeed: 1300,
        };

        this.catcherEntity = new Catcher(
            catcherConfig.id,
            catcherConfig.texture,
            catcherConfig.lives,
            catcherConfig.score,
            catcherConfig.maxSpeed
        );

        const poisonConfig = {
            id: "poison",
            texture: lvlPoisonStr,
            gravityY: 400,
            rotationSpeed: 170,
        };

        this.poisonEntity = new Poison(
            poisonConfig.id,
            poisonConfig.texture,
            poisonConfig.gravityY,
            poisonConfig.rotationSpeed
        );

        const targetConfig = {
            id: "target",
            texture: lvlTargetStr,
            points: 10,
            gravityY: 400,
            rotationSpeed: 170,
        };

        this.targetEntity = new Target(
            targetConfig.id,
            targetConfig.texture,
            targetConfig.points,
            targetConfig.gravityY,
            targetConfig.rotationSpeed
        );

        this.background = this.add
            .image(0, 0, lvlBackgroundStr)
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.catcher = this.physics.add
            .image(360, 1200, lvlCatcherStr)
            .setOrigin(0.5, 0.5)
            .setDisplaySize(130, 120)
            .setCollideWorldBounds(true);

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            const deltaX = pointer.x - this.catcher.x;
            const targetX = pointer.x;

            if (
                Math.abs(deltaX) >
                (this.catcherEntity.maxSpeed * this.game.loop.delta) / 1000
            ) {
                this.catcher.x +=
                    (Math.sign(deltaX) *
                        this.catcherEntity.maxSpeed *
                        this.game.loop.delta) /
                    1000;
            } else {
                this.catcher.x = targetX;
            }
        });

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const targetX = pointer.x;
            this.catcher.x = targetX;
        });

        this.poisons = this.physics.add.group();
        this.targets = this.physics.add.group();

        this.startSpawningUseCase.execute((item: Item) => {
            if (item.type === 'poison') {
                this.createFallingPoison(item.x, item.y);
            } else if (item.type === 'target') {
                this.createFallingTarget(item.x, item.y);
            }
        });
    }

    createFallingPoison(x: number, y: number) {
        const poison = this.poisons.create(x, y, this.poisonEntity.texture)
            .setDisplaySize(80, 80)
            .setGravityY(this.poisonEntity.gravityY)
            .setAngularVelocity(this.poisonEntity.rotationSpeed)
            .setCollideWorldBounds(true)
            .setBounce(0.6);

        poison.body.onWorldBounds = true;
    }

    createFallingTarget(x: number, y: number) {
        const target = this.targets.create(x, y, this.targetEntity.texture)
            .setDisplaySize(80, 80)
            .setGravityY(400)
            .setAngularVelocity(170)
            .setCollideWorldBounds(true)
            .setBounce(0.6);

        target.body.onWorldBounds = true;
    }

    shutdown() {
        this.endSpawningUseCase.execute();
    }
}