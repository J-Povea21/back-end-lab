import { IsString, IsOptional, IsEnum, IsArray, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { ChallengeDifficulty } from "../../domain/enums/challenge-difficulty";
import { ChallengeStatus } from "../../domain/enums/challenge-status";

export class UpdateChallengeDto {
    @ApiHideProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;

    @ApiProperty({ 
        description: 'Title of the challenge',
        example: 'Two Sum Problem',
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ 
        description: 'Detailed description of the challenge',
        example: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ 
        description: 'Difficulty level of the challenge',
        enum: ChallengeDifficulty,
        example: ChallengeDifficulty.MEDIUM,
        required: false
    })
    @IsEnum(ChallengeDifficulty)
    @IsOptional()
    difficulty?: ChallengeDifficulty;

    @ApiProperty({ 
        description: 'Tags associated with the challenge',
        example: ['array', 'hash-table', 'algorithms'],
        type: [String],
        required: false
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiProperty({ 
        description: 'Time limit in milliseconds',
        example: 5000,
        type: Number,
        required: false
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    timeLimit?: number;

    @ApiProperty({ 
        description: 'Memory limit in megabytes',
        example: 256,
        type: Number,
        required: false
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    memoryLimit?: number;

    @ApiProperty({ 
        description: 'Current status of the challenge',
        enum: ChallengeStatus,
        example: ChallengeStatus.PUBLISHED,
        required: false
    })
    @IsEnum(ChallengeStatus)
    @IsOptional()
    status?: ChallengeStatus;

    @ApiHideProperty()
    @IsUUID()
    @IsOptional()
    creatorId?: string;

    @ApiProperty({ 
        description: 'UUID of the course this challenge belongs to',
        example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
        type: String,
        required: false
    })
    @IsUUID()
    @IsOptional()
    courseId?: string;
}