import { ChallengeRepositoryPort } from "../../domain/repository/challenge.repository.port";
import { Challenge } from "../../domain/entity/challenge.entity";

export class GetChallengeUsecase {
    constructor(private readonly challengeRepository: ChallengeRepositoryPort) {}

    async execute(id: number): Promise<Challenge> {
        const challenge = await this.challengeRepository.findById(id);
        if (!challenge) {
            throw new Error('Challenge not found');
        }
        return challenge;
    }
}