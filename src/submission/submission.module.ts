import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SubmissionController } from './interface/http/submission.controller';
import { SubmissionWorker } from './infrastructure/workers/submission.worker';
import { PrismaService } from '@common/prisma/prisma.service';
import { IJobQueue } from './infrastructure/ports/job-queue.port';
import { BullMqAdapter } from './infrastructure/adapters/bullmq.adapter';
import { CreateSubmissionUseCase } from './core/application/use-cases/create-submission.use-case';
import { ProcessSubmissionUseCase } from './core/application/use-cases/process-submission.use-case';
import { PrismaSubmissionRepository } from './infrastructure/adapters/prisma-submission.repository';
import { ISubmissionRepository } from './infrastructure/ports/submission.repository.port';
import { PrismaModule } from '@common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueueAsync({name: 'submissionQueue'})],
  controllers: [SubmissionController],
  providers: [
    SubmissionWorker,
    CreateSubmissionUseCase,
    ProcessSubmissionUseCase,
    {
      provide: IJobQueue,
      useClass: BullMqAdapter,
    },
    {
        provide: ISubmissionRepository,
        useClass: PrismaSubmissionRepository,
    }
  ]
})
export class SubmissionModule {}
