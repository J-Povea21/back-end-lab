import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryPort } from '@auth/core/domain/repositories/user.repository.port';
import { LoginUserDTO } from '../dto/login-user.dto';
import { User } from '@auth/core/domain/entities/user.entity';


@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginUserDTO): Promise<{ token: string; user: Partial<User> }> {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
