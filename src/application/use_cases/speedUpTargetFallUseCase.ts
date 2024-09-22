import { Target } from "@domain/entities/Target";
import { TargetRepository } from "@domain/repositories/TargetRepository";

export class SpeedUpTargetFallUseCase {
    constructor(private targetRepository: TargetRepository) {}

    async execute(target: Target): Promise<Target> {
        return this.targetRepository.speedUpFall(target);
    }
}