import { Injectable } from "@nestjs/common";
import { CreateChallengeDto } from "../dto/create-challenge.dto";
import { ChallengeRepositoryPort } from "../../domain/repository/challenge.repository.port";
import { Challenge } from "../../domain/entity/challenge.entity";
import { ChallengeDifficulty } from "../../domain/enums/challenge-difficulty";
import { ChallengeStatus } from "../../domain/enums/challenge-status";

@Injectable()
export class CreateChallengeUsecase {
    constructor(private readonly challengeRepository: ChallengeRepositoryPort) {}

    async execute(input: CreateChallengeDto): Promise<Challenge> {
        const challenge = new Challenge(
            0, 
            input.title, 
            input.description, 
            input.difficulty as ChallengeDifficulty, 
            input.tags, 
            input.timeLimit, 
            input.memoryLimit, 
            input.status as ChallengeStatus, 
            input.creatorId,
            input.courseId);

        return await this.challengeRepository.create(challenge);
    }
}