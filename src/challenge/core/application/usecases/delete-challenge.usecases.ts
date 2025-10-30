import { Injectable } from "@nestjs/common";
import { ChallengeRepositoryPort } from "../../domain/repository/challenge.repository.port";

@Injectable()
export class DeleteChallengeUsecase {
    constructor(private readonly challengeRepository: ChallengeRepositoryPort) {}

    async execute(id: number): Promise<void> {
        const challenge = await this.challengeRepository.findById(id);
        if (!challenge) {
            throw new Error('Challenge not found');
        }
        await this.challengeRepository.delete(id);
    }
}