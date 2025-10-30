import { Challenge } from "../entity/challenge.entity";

export abstract class ChallengeRepositoryPort {
    abstract create(challenge: Challenge): Promise<Challenge>;
    abstract findById(id: number): Promise<Challenge | null>;
    abstract findAll(): Promise<Challenge[]>;
    abstract update(challenge: Challenge): Promise<Challenge>;
    abstract delete(id: number): Promise<void>;
}