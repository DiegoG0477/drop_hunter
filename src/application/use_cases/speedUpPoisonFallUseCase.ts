import { Poison } from "@domain/entities/Poison";
import { PoisonRepository } from "@domain/repositories/PoisonRepository";

export class SpeedUpPoisonFallUseCase {
    constructor(private poisonRepository: PoisonRepository) {}

    async execute(poison: Poison): Promise<Poison> {
        return this.poisonRepository.speedUpFall(poison);
    }
}