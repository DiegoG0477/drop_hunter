import { GameRepository } from "@domain/repositories/GameRepository";

export class StopClockUseCase {
    constructor(private gameRepository: GameRepository) {}

    execute() {
        this.gameRepository.stopClock();
    }
}
