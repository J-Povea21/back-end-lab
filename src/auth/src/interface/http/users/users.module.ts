import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { RegisterUserUseCase } from '../../../core/application/usecases/register-user.usecase';
import { LoginUserUseCase } from '../../../core/application/usecases/login-user.usecase';
import { PrismaUserRepository } from '../../../infrastructure/prisma/prisma-user.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { AuthModule } from '../../../infrastructure/auth/auth.module';
import { USER_REPOSITORY } from '../../../core/application/tokens';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
      PrismaService,
      {
        provide: USER_REPOSITORY,
        useClass: PrismaUserRepository,
      },
      RegisterUserUseCase,
      LoginUserUseCase,
    ],
  })
export class UsersModule {}