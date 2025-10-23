import { CreateChallengeDto } from "../dto/create-challenge.dto";
import { ChallengeRepositoryPort } from "../../domain/repository/challenge.repository.port";
import { Challenge } from "../../domain/entity/challenge.entity";

export class CreateChallengeUsecase {
    constructor(private readonly challengeRepository: ChallengeRepositoryPort) {}

    async execute(input: CreateChallengeDto): Promise<CreateChallengeDto> {
        const challenge = new Challenge(
            0, 
            input.title, 
            input.difficulty, 
            input.tags, 
            input.timeLimit, 
            input.memoryLimit, 
            input.status, 
            input.description, 
            input.creatorId);
            
        await this.challengeRepository.create(challenge);
        return challenge;
    }
}