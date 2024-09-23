import { GameRepository } from "@domain/repositories/GameRepository";

export class InitClockUseCase {
    constructor(private gameRepository: GameRepository) {}

    execute(callback: (minutes: number, seconds: number) => void) {
        this.gameRepository.startClock(callback);
    }
}