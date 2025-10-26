import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { RegisterUserUseCase } from '@auth/core/application/usecases/register-user.usecase';
import { LoginUserUseCase } from '@auth/core/application/usecases/login-user.usecase';
import { PrismaUserRepository } from '@auth/infrastructure/prisma/prisma-user.repository';
import { UserRepositoryPort } from '@auth/core/domain/repositories/user.repository.port';
import { AuthModule } from '@auth/infrastructure/auth/auth.module';
import { User } from '@auth/core/domain/entities/user.entity';
import { PrismaModule } from '@common/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UsersController],
  providers: [
      {
        provide: UserRepositoryPort,
        useClass: PrismaUserRepository,
      },
      RegisterUserUseCase,
      LoginUserUseCase,
    ],
  })
export class UsersModule {}