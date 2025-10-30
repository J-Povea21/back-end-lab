import { IsString, IsNotEmpty, IsEnum, IsArray, IsNumber, IsPositive, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { ChallengeDifficulty } from "../../domain/enums/challenge-difficulty";
import { ChallengeStatus } from "../../domain/enums/challenge-status";

export class CreateChallengeDto {
    @ApiProperty({ 
        description: 'Title of the challenge',
        example: 'Two Sum Problem',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ 
        description: 'Detailed description of the challenge',
        example: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ 
        description: 'Difficulty level of the challenge',
        enum: ChallengeDifficulty,
        example: ChallengeDifficulty.EASY
    })
    @IsEnum(ChallengeDifficulty)
    @IsNotEmpty()
    difficulty: ChallengeDifficulty;

    @ApiProperty({ 
        description: 'Tags associated with the challenge',
        example: ['array', 'hash-table', 'algorithms'],
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    tags: string[];

    @ApiProperty({ 
        description: 'Time limit in milliseconds',
        example: 5000,
        type: Number
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    timeLimit: number;

    @ApiProperty({ 
        description: 'Memory limit in megabytes',
        example: 256,
        type: Number
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    memoryLimit: number;

    @ApiProperty({ 
        description: 'Current status of the challenge',
        enum: ChallengeStatus,
        example: ChallengeStatus.DRAFT
    })
    @IsEnum(ChallengeStatus)
    @IsNotEmpty()
    status: ChallengeStatus;

    @ApiHideProperty()
    @IsUUID()
    @IsOptional()
    creatorId?: string;

    @ApiProperty({ 
        description: 'UUID of the course this challenge belongs to',
        example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
        type: String
    })
    @IsUUID()
    @IsNotEmpty()
    courseId: string;
}
