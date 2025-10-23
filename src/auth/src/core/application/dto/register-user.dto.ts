import { IsEmail, IsString, IsOptional, MinLength, IsIn } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsIn(['STUDENT', 'ADMIN'])
  role?: 'STUDENT' | 'ADMIN';
}
