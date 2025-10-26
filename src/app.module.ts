import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { UsersModule } from './auth/interface/http/users/users.module';
import { SubmissionModule } from '@submission/submission.module';
import { ChallengesHttpModule } from './challenge/interface/http/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ChallengesHttpModule,
    SubmissionModule
  ],
})
export class AppModule {}
