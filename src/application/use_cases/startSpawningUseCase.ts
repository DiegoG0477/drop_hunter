import { GameRepository } from "@domain/repositories/GameRepository";
import { Item } from "@domain/entities/Item";

export class StartSpawningUseCase {
    constructor(readonly gameRepository: GameRepository) {}

    async execute(callback: (item: Item) => void): Promise<void> {
        this.gameRepository.startSpawning();

        while (true) {
            const item = await this.gameRepository.getNextSpawnItem();
            callback(item);
        }
    }
}