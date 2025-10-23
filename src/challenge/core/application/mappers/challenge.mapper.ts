import { Challenge } from "../../domain/entity/challenge.entity";
import { ChallengeDto } from "../dto/challenge.dto";

export const toChallengeDto = (challenge: Challenge): ChallengeDto => {
    return {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        tags: challenge.tags,
        timeLimit: challenge.timeLimit,
        memoryLimit: challenge.memoryLimit,
        status: challenge.status,
        creatorId: challenge.creatorId,
    };
};
