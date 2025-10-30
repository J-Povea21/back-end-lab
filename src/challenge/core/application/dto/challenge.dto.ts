import { ApiProperty } from '@nestjs/swagger';
import { ChallengeDifficulty } from "../../domain/enums/challenge-difficulty";
import { ChallengeStatus } from "../../domain/enums/challenge-status";

export class ChallengeDto {
    @ApiProperty({ 
        description: 'Unique identifier of the challenge',
        example: 1,
        type: Number
    })
    id: number;

    @ApiProperty({ 
        description: 'Title of the challenge',
        example: 'Two Sum Problem',
        type: String
    })
    title: string;

    @ApiProperty({ 
        description: 'Detailed description of the challenge',
        example: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        type: String
    })
    description: string;

    @ApiProperty({ 
        description: 'Difficulty level of the challenge',
        enum: ChallengeDifficulty,
        example: ChallengeDifficulty.EASY
    })
    difficulty: ChallengeDifficulty;

    @ApiProperty({ 
        description: 'Tags associated with the challenge',
        example: ['array', 'hash-table', 'algorithms'],
        type: [String]
    })
    tags: string[];

    @ApiProperty({ 
        description: 'Time limit in milliseconds',
        example: 5000,
        type: Number
    })
    timeLimit: number;

    @ApiProperty({ 
        description: 'Memory limit in megabytes',
        example: 256,
        type: Number
    })
    memoryLimit: number;

    @ApiProperty({ 
        description: 'Current status of the challenge',
        enum: ChallengeStatus,
        example: ChallengeStatus.PUBLISHED
    })
    status: ChallengeStatus;

    @ApiProperty({ 
        description: 'UUID of the user who created the challenge',
        example: 'c7e7e980-23d1-4a8f-bda2-d00e71d9aa3d',
        type: String
    })
    creatorId: string;

    @ApiProperty({ 
        description: 'UUID of the course this challenge belongs to',
        example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
        type: String
    })
    courseId: string;
}