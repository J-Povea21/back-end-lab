import { ChallengeDifficulty } from "../enums/challenge-difficulty";
import { ChallengeStatus } from "../enums/challenge-status";

export class Challenge {
    constructor(
        public readonly id: number,
        public title: string,
        public description: string,
        public difficulty: ChallengeDifficulty,
        public tags: string[],
        public timeLimit: number,
        public memoryLimit: number,
        public status: ChallengeStatus,
        public creatorId: number,
    ) {}
}