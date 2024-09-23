import { GameRepository } from "@domain/repositories/GameRepository";

export class StopFpsCounterUseCase {
    constructor(private gameRepository: GameRepository) {}

    execute() {
        this.gameRepository.stopFpsCounter();
    }
}