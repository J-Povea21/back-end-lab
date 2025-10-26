import { IsString, IsNotEmpty, IsUUID, IsNumber, IsPositive } from 'class-validator';

export class CreateSubmissionDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  challengeId: number;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  language: string;
  
}