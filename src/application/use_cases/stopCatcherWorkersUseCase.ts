import { CatcherRepository } from "@domain/repositories/CatcherRepository";

export class StopCatcherWorkersUseCase {
    constructor(private catcherRepository: CatcherRepository) {}

    execute(): void {
        this.catcherRepository.stopWorkers();
    }
}