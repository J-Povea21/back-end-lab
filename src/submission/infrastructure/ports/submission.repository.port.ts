import { Submission } from "@submission/core/domain/submission.entity";

export abstract class ISubmissionRepository {
  abstract save(submission: Submission): Promise<Submission>;
  abstract findById(id: string): Promise<Submission | null>;
  abstract update(submission: Submission): Promise<Submission>;
}


export type CreateSubmissionData = {
  userId: string;
  challengeId: number;
  courseId: string;
  code: string;
  language: string;
  status: string;
};