export class Catcher{
    constructor(
        readonly id: string,
        readonly image: string,
        readonly lives: number,
        readonly score: number,
        readonly maxSpeed: number,
    ){}
}