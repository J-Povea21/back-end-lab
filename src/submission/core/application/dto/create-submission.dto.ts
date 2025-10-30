import { IsString, IsNotEmpty, IsUUID, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ 
    description: 'The ID of the challenge to submit',
    example: 1,
    type: Number
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  challengeId: number;

  @ApiProperty({ 
    description: 'The UUID of the course',
    example: 'c7e7e980-23d1-4a8f-bda2-d00e71d9aa3d',
    type: String
  })
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ 
    description: 'The source code of the submission',
    example: 'function solve(input) { return input * 2; }',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ 
    description: 'Programming language of the submission',
    example: 'javascript',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  language: string;
  
}