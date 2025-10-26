import { ChallengeDifficulty } from "../../domain/enums/challenge-difficulty";
import { ChallengeStatus } from "../../domain/enums/challenge-status";

export class CreateChallengeDto {
    title: string;
    description: string;
    difficulty: ChallengeDifficulty;
    tags: string[];
    timeLimit: number;
    memoryLimit: number;
    status: ChallengeStatus;
    creatorId: string;
    courseId: string;
}
