import { Poison } from "@domain/entities/Poison";

export interface PoisonRepository {
    speedUpFall(poison: Poison): Promise<Poison>;
}