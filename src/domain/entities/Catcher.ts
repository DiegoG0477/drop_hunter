export class Catcher{
    constructor(
        readonly id: string,
        readonly texture: string,
        private lives: number,
        private score: number,
        readonly maxSpeed: number,
    ){}

    getLives(): number {
        return this.lives;
    }

    getScore(): number {
        return this.score;
    }

    setLives(lives: number): void {
        this.lives = lives;
    }

    setScore(score: number): void {
        this.score = score;
    }
}