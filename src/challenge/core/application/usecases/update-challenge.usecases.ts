import { UpdateChallengeDto } from "../dto/update-challenge.dto";
import { ChallengeRepositoryPort } from "../../domain/repository/challenge.repository.port";
import { Challenge } from "../../domain/entity/challenge.entity";

export class UpdateChallengeUsecase {
    constructor(private readonly challengeRepository: ChallengeRepositoryPort) {}

    async execute(input: UpdateChallengeDto): Promise<UpdateChallengeDto> {
        const challenge = await this.challengeRepository.findById(input.id);
        if (!challenge) {
            throw new Error('Challenge not found');
        }
        challenge.title = input.title;
        challenge.description = input.description;
        challenge.difficulty = input.difficulty;
        challenge.tags = input.tags;
        challenge.timeLimit = input.timeLimit;
        challenge.memoryLimit = input.memoryLimit;
        challenge.status = input.status;
        await this.challengeRepository.update(challenge);
        return challenge;
    }
}