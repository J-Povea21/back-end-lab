import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './auth/interface/http/users/users.module';
import { ChallengesHttpModule } from './challenge/interface/http/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ChallengesHttpModule,
  ],
})
export class AppModule {}
