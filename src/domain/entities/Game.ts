import { Target } from "./Target";
import { Catcher } from "./Catcher";
import { Poison } from "./Poison";

export class Game{
    constructor(
        readonly id: string,
        readonly target: Target,
        readonly catcher: Catcher,
        readonly poison: Poison,
        readonly level: number,
    ){}
}