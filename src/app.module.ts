import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthHttpModule } from './auth/interface/http/auth.module';
import { ChallengesHttpModule } from './challenge/interface/http/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
      AuthHttpModule,
      ChallengesHttpModule,
  ],
})
export class AppModule {}
