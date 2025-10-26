import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async execute(data: RegisterUserDTO): Promise<User> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepo.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role ?? 'STUDENT',
    });

    return user;
  }
}
