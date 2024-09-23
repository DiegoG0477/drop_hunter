export class Target{
    constructor(
        readonly id: string,
        readonly texture: string,
        readonly points: number,
        readonly gravity: number,
        readonly rotationSpeed: number
    ){}
}