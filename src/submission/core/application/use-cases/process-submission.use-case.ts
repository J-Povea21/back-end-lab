import { Injectable } from "@nestjs/common";
import { ISubmissionRepository } from "@submission/infrastructure/ports/submission.repository.port";
import { Verdict } from "@submission/core/domain/submission.entity";

@Injectable()
export class ProcessSubmissionUseCase {
  constructor(
    private readonly submissionRepository: ISubmissionRepository,
  ) {}

  async execute(data: { submissionId: string }): Promise<void> {
    const { submissionId } = data;

    const submission = await this.submissionRepository.findById(submissionId);
    
    if (!submission) {
      throw new Error(`Submission ${submissionId} not found`);
    }

    try {
      submission.startProcessing();
      await this.submissionRepository.update(submission);

      // TODO: Integrate with the actual code execution service!
      await new Promise(resolve => setTimeout(resolve, 1000));

      submission.markAsCompleted({
        verdict: Verdict.ACCEPTED,
        score: 100,
        executionTime: 150,
        memoryUsed: 32,
      });
      await this.submissionRepository.update(submission);

    } catch (error) {
      submission.markAsFailed(error.message);
      await this.submissionRepository.update(submission);
      throw error;
    }
  }
}