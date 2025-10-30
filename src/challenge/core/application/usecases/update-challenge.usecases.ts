import { Injectable } from "@nestjs/common";
import { UpdateChallengeDto } from "../dto/update-challenge.dto";
import { ChallengeRepositoryPort } from "../../domain/repository/challenge.repository.port";
import { Challenge } from "../../domain/entity/challenge.entity";

@Injectable()
export class UpdateChallengeUsecase {
    constructor(private readonly challengeRepository: ChallengeRepositoryPort) {}

    async execute(input: UpdateChallengeDto): Promise<Challenge> {
        const challenge = await this.challengeRepository.findById(input.id);
        if (!challenge) {
            throw new Error('Challenge not found');
        }
        if (input.title !== undefined) challenge.title = input.title;
        if (input.description !== undefined) challenge.description = input.description;
        if (input.difficulty !== undefined) challenge.difficulty = input.difficulty;
        if (input.tags !== undefined) challenge.tags = input.tags;
        if (input.timeLimit !== undefined) challenge.timeLimit = input.timeLimit;
        if (input.memoryLimit !== undefined) challenge.memoryLimit = input.memoryLimit;
        if (input.status !== undefined) challenge.status = input.status;
        if (input.courseId !== undefined) challenge.courseId = input.courseId;
        await this.challengeRepository.update(challenge);
        return challenge;
    }
}