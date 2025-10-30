import { Injectable } from "@nestjs/common";
import { ChallengeRepositoryPort } from "../../domain/repository/challenge.repository.port";
import { Challenge } from "../../domain/entity/challenge.entity";

@Injectable()
export class ListsChallengeUsecase {
    constructor(private readonly challengeRepository: ChallengeRepositoryPort) {}
    async execute(): Promise<Challenge[]> {
        return await this.challengeRepository.findAll();
    }
}