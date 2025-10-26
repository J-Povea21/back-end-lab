import { Processor, WorkerHost } from '@nestjs/bullmq';
import { ProcessSubmissionUseCase } from "@submission/core/application/use-cases/process-submission.use-case";
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export type ProcessSubmissionJobData = {
  submissionId: string;
  language: string;
};

@Processor('submissionQueue')
export class SubmissionWorker extends WorkerHost {
  private readonly logger = new Logger(SubmissionWorker.name);
  private readonly supportedLanguage: string;

  constructor(
    private readonly processSubmissionUseCase: ProcessSubmissionUseCase,
  ) {
    super();
    this.supportedLanguage = process.env.WORKER_LANGUAGE || 'all';
    this.logger.log(`Worker initialized for language: ${this.supportedLanguage}`);
  }

  async process(job: Job<ProcessSubmissionJobData>): Promise<void> {
    const { submissionId, language } = job.data;

    if (this.supportedLanguage !== 'all' && language !== this.supportedLanguage) {
      this.logger.debug(
        `Skipping job ${job.id} - language ${language} doesn't match ${this.supportedLanguage}`
      );
      return; // Skip this job
    }

    this.logger.log({
      message: 'Started processing submission',
      submissionId,
      language,
      jobId: job.id,
      worker: this.supportedLanguage,
    });

    try {
      await this.processSubmissionUseCase.execute({ submissionId });

      this.logger.log({
        message: 'Successfully processed submission',
        submissionId,
        jobId: job.id,
      });
    } catch (error) {
      this.logger.error({
        message: 'Failed to process submission',
        submissionId,
        jobId: job.id,
        error: error.message,
      });
      throw error;
    }
  }
}