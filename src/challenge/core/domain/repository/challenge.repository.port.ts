import { Challenge } from "../entity/challenge.entity";

export interface ChallengeRepositoryPort {
    create(challenge: Challenge): Promise<Challenge>;
    findById(id: number): Promise<Challenge | null>;
    findAll(): Promise<Challenge[]>;
    update(challenge: Challenge): Promise<Challenge>;
    delete(id: number): Promise<void>;
}