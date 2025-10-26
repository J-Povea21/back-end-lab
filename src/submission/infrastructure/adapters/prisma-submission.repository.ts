import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { ISubmissionRepository } from '@submission/infrastructure/ports/submission.repository.port';
import { Submission, SubmissionStatus, Verdict } from '@submission/core/domain/submission.entity';

@Injectable()
export class PrismaSubmissionRepository implements ISubmissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(submission: Submission): Promise<Submission> {
    const data = submission.toObject();

    const created = await this.prisma.submission.create({
      data: {
        userId: data.userId,
        challengeId: data.challengeId,
        courseId: data.courseId,
        code: data.code,
        language: data.language,
        status: data.status,
        verdict: data.verdict || null,
        score: data.score || null,
        executionTime: data.executionTime || null,
        memoryUsed: data.memoryUsed || null,
        errorMessage: data.errorMessage || null,
      },
    });

    return Submission.fromPersistence({
      id: created.id,
      userId: created.userId,
      challengeId: created.challengeId,
      courseId: created.courseId,
      code: created.code,
      language: created.language,
      status: created.status as SubmissionStatus,
      verdict: created.verdict as Verdict | undefined,
      score: created.score || undefined,
      executionTime: created.executionTime || undefined,
      memoryUsed: created.memoryUsed || undefined,
      errorMessage: created.errorMessage || undefined,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async findById(id: string): Promise<Submission | null> {
    const found = await this.prisma.submission.findUnique({
      where: { id },
    });

    if (!found) {
      return null;
    }

    return Submission.fromPersistence({
      id: found.id,
      userId: found.userId,
      challengeId: found.challengeId,
      courseId: found.courseId,
      code: found.code,
      language: found.language,
      status: found.status as SubmissionStatus,
      verdict: found.verdict as Verdict | undefined,
      score: found.score || undefined,
      executionTime: found.executionTime || undefined,
      memoryUsed: found.memoryUsed || undefined,
      errorMessage: found.errorMessage || undefined,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async update(submission: Submission): Promise<Submission> {
    if (!submission.id) {
      throw new Error('Cannot update submission without ID');
    }

    const data = submission.toObject();

    const updated = await this.prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: data.status,
        verdict: data.verdict || null,
        score: data.score || null,
        executionTime: data.executionTime || null,
        memoryUsed: data.memoryUsed || null,
        errorMessage: data.errorMessage || null,
      },
    });

    return Submission.fromPersistence({
      id: updated.id,
      userId: updated.userId,
      challengeId: updated.challengeId,
      courseId: updated.courseId,
      code: updated.code,
      language: updated.language,
      status: updated.status as SubmissionStatus,
      verdict: updated.verdict as Verdict | undefined,
      score: updated.score || undefined,
      executionTime: updated.executionTime || undefined,
      memoryUsed: updated.memoryUsed || undefined,
      errorMessage: updated.errorMessage || undefined,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }
}