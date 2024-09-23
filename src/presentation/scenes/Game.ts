import { Scene } from "phaser";
import { Catcher } from "@domain/entities/Catcher";
import { Poison } from "@domain/entities/Poison";
import { Target } from "@domain/entities/Target";
import { PhaserGameRepository } from "@framework/PhaserGameRepository";
import { PhaserCatcherRepository } from "@framework/PhaserCatcherRepository";
import { StartSpawningUseCase } from "@application/use_cases/startSpawningUseCase";
import { EndSpawningUseCase } from "@application/use_cases/endSpawningUseCase";
import { IncreaseScoreUseCase } from "@application/use_cases/increaseScoreUseCase";
import { StopCatcherWorkersUseCase } from "@application/use_cases/stopCatcherWorkersUseCase";
import { InitClockUseCase } from "@application/use_cases/initClockUseCase";
import { StopClockUseCase } from "@application/use_cases/stopClockUseCase";
import { LoseLifeUseCase } from "@application/use_cases/loseLifeUseCase";
import { Item } from "@domain/entities/Item";

export class Game extends Scene {
    private stopCatcherWorkersUseCase: StopCatcherWorkersUseCase;
    private startSpawningUseCase: StartSpawningUseCase;
    private endSpawningUseCase: EndSpawningUseCase;
    private increaseScoreUseCase: IncreaseScoreUseCase;
    private loseLifeUseCase: LoseLifeUseCase;
    private stopClockUseCase: StopClockUseCase;
    private initClockUseCase: InitClockUseCase;
    background: Phaser.GameObjects.Image;
    panel: Phaser.GameObjects.Image;
    outOfBoundsCollider: Phaser.Physics.Arcade.Image;
    scoreText: Phaser.GameObjects.Text;
    livesText: Phaser.GameObjects.Text;
    durationText: Phaser.GameObjects.Text;
    poisons: Phaser.Physics.Arcade.Group;
    targets: Phaser.Physics.Arcade.Group;
    catcher: Phaser.Physics.Arcade.Image;
    catcherEntity: Catcher;
    poisonEntity: Poison;
    targetEntity: Target;
    level: number;
    duration: string;
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
        const catcherRepository = new PhaserCatcherRepository();

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
        this.increaseScoreUseCase = new IncreaseScoreUseCase(catcherRepository);
        this.loseLifeUseCase = new LoseLifeUseCase(catcherRepository);
        this.stopCatcherWorkersUseCase = new StopCatcherWorkersUseCase(catcherRepository);
        this.stopClockUseCase = new StopClockUseCase(gameRepository);
        this.initClockUseCase = new InitClockUseCase(gameRepository);

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

        this.panel = this.add
            .image(20, 0, "gamePanel")
            .setOrigin(0, 0)
            .setDisplaySize(250, 250);

        this.scoreText = this.add.text(40, 40, `Score: ${this.catcherEntity.getScore()}`, {
            fontFamily: "square",
            fontSize: "35px",
            color: "#fff",
        });

        this.livesText = this.add.text(40, 100, `Lives: ${this.catcherEntity.getLives()}`, {
            fontFamily: "square",
            fontSize: "35px",
            color: "#fff",
        });

        this.initClockUseCase.execute((minutes: number, seconds: number) => {
            this.updateDurationText(minutes, seconds);
        });

        // Texto para mostrar la duración
        this.durationText = this.add.text(40, 160, "Time: 00:00", {
            fontFamily: "square",
            fontSize: "35px",
            color: "#fff",
        });

        this.outOfBoundsCollider = this.physics.add
        .image(this.scale.width / 2, this.scale.height + 50, "")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(this.scale.width, 100)
        .setImmovable(true)
        .setGravity(0, 0);

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

        this.physics.add.overlap(this.catcher, this.targets, (catcher, target) => {
            this.increaseScoreUseCase.execute(this.catcherEntity, this.targetEntity.points);
            this.updateScoreText();
            target.destroy();
        });

        this.physics.add.overlap(this.outOfBoundsCollider, this.targets, (collider, target) => {
            this.handleTargetMissed(target);
        });

        this.physics.add.overlap(this.outOfBoundsCollider, this.targets, (collider, poison) => {
            poison.destroy();
        });

        this.physics.add.overlap(this.catcher, this.poisons, (catcher, poison) => {
            poison.destroy();
            this.shutdown();
        });
    }

    createFallingPoison(x: number, y: number) {
        const poison = this.poisons.create(x, y, this.poisonEntity.texture)
            .setDisplaySize(80, 80)
            .setGravityY(this.poisonEntity.gravityY)
            .setAngularVelocity(this.poisonEntity.rotationSpeed)
            .setCollideWorldBounds(false);
    }

    createFallingTarget(x: number, y: number) {
        const target = this.targets.create(x, y, this.targetEntity.texture)
            .setDisplaySize(80, 80)
            .setGravityY(400)
            .setAngularVelocity(170)
            .setCollideWorldBounds(false);
    }

    handleTargetMissed(target: any) {
        this.loseLifeUseCase.execute(this.catcherEntity);
        this.updateLivesText();
        target.destroy();

        if (this.catcherEntity.getLives() <= 0) {
            this.shutdown();
        }
    }

    updateScoreText() {
        this.scoreText.setText(`Score: ${this.catcherEntity.getScore()}`);
    }

    updateLivesText() {
        this.livesText.setText(`Lives: ${this.catcherEntity.getLives()}`);
    }

    updateDurationText(minutes: number, seconds: number) {
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        this.durationText.setText(`Time: ${formattedMinutes}:${formattedSeconds}`);
    }

    shutdown() {
        this.endSpawningUseCase.execute();
        this.stopCatcherWorkersUseCase.execute();
        this.stopClockUseCase.execute();

        this.catcher.destroy();
        this.poisons.clear(true, true);
        this.targets.clear(true, true);

        this.scoreText.destroy();
        this.livesText.destroy();

        this.background.destroy();

        this.input.off("pointermove");
        this.input.off("pointerdown");

        this.scene.stop("Game");

        this.scene.start("GameOver", {
            score: this.catcherEntity.getScore(),
            level: this.level,
        });
    }
}