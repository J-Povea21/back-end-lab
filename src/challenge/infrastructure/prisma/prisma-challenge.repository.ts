import { ChallengeRepositoryPort } from "../../core/domain/repository/challenge.repository.port";
import { Challenge } from "../../core/domain/entity/challenge.entity";
import { PrismaService } from "../database/prisma.service";
import { ChallengeDifficulty } from "../../core/domain/enums/challenge-difficulty";
import { ChallengeStatus } from "../../core/domain/enums/challenge-status";

export class PrismaChallengeRepository implements ChallengeRepositoryPort {
    constructor(private readonly prisma: PrismaService) {}
    
    async create(challenge: Challenge): Promise<Challenge> {
        await this.prisma.challenge.create({
            data: {
                id: challenge.id,
                title: challenge.title,
                description: challenge.description,
                difficulty: challenge.difficulty,
                tags: challenge.tags,
                timeLimit: challenge.timeLimit,
                memoryLimit: challenge.memoryLimit,
                status: challenge.status,
                creatorId: challenge.creatorId,
            },
        });
        return new Challenge(
            challenge.id, 
            challenge.title, 
            challenge.description, 
            challenge.difficulty as ChallengeDifficulty, 
            challenge.tags, 
            challenge.timeLimit, 
            challenge.memoryLimit, 
            challenge.status as ChallengeStatus, 
            challenge.creatorId);
    }

    async findById(id: number): Promise<Challenge | null> {
        const challenge = await this.prisma.challenge.findUnique({
            where: { id },
        });
        return challenge ? new Challenge(
            challenge.id, 
            challenge.title, 
            challenge.description, 
            challenge.difficulty as ChallengeDifficulty, 
            challenge.tags, 
            challenge.timeLimit, 
            challenge.memoryLimit, 
            challenge.status as ChallengeStatus, 
            challenge.creatorId) : null;
    }
    async findAll(): Promise<Challenge[]> {
        const challenges = await this.prisma.challenge.findMany();
        return challenges.map(challenge => new Challenge(
            challenge.id, 
            challenge.title, 
            challenge.description, 
            challenge.difficulty as ChallengeDifficulty, 
            challenge.tags, 
            challenge.timeLimit, 
            challenge.memoryLimit, 
            challenge.status as ChallengeStatus, 
            challenge.creatorId));
    }
    async update(challenge: Challenge): Promise<Challenge> {
        await this.prisma.challenge.update({
            where: { id: challenge.id },
            data: {
                title: challenge.title,
                description: challenge.description,
                difficulty: challenge.difficulty,
                tags: challenge.tags,
                timeLimit: challenge.timeLimit,
                memoryLimit: challenge.memoryLimit,
                status: challenge.status as ChallengeStatus,
            },
        });
        return new Challenge(
            challenge.id, 
            challenge.title, 
            challenge.description, 
            challenge.difficulty as ChallengeDifficulty, 
            challenge.tags, 
            challenge.timeLimit, 
            challenge.memoryLimit, 
            challenge.status as ChallengeStatus, 
            challenge.creatorId);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.challenge.delete({
            where: { id },
        });
    }
}