import { Injectable } from "@nestjs/common";
import { IJobQueue } from "src/submission/infrastructure/ports/job-queue.port";
import { CreateSubmissionDto } from "@submission/core/application/dto/create-submission.dto";
import { ISubmissionRepository } from "@submission/infrastructure/ports/submission.repository.port";
import { Submission } from "@submission/core/domain/submission.entity";


export type CreateSubmissionInput = {
  userId: string;
  challengeId: number;
  courseId: string;
  code: string;
  language: string;
};


@Injectable()
export class CreateSubmissionUseCase {
  constructor(
    private readonly jobQueue: IJobQueue,
    private readonly submissionRepository: ISubmissionRepository,
  ) {}

  async execute(data: CreateSubmissionInput): Promise<string> {
    const submission = Submission.create({
      userId: data.userId,
      challengeId: data.challengeId,
      courseId: data.courseId,
      code: data.code,
      language: data.language,
    });

    const savedSubmission = await this.submissionRepository.save(submission); // This returns an ID!

    await this.jobQueue.addJob('submission', {
      submissionId: savedSubmission.id,
      language: savedSubmission.language,
    });

    return savedSubmission.id!;
  }
}