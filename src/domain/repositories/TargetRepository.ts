import { Target } from "@domain/entities/Target";

export interface TargetRepository {
    speedUpFall(target: Target): Promise<Target>;
}