export enum SubmissionStatus {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum Verdict {
  ACCEPTED = 'ACCEPTED',
  WRONG_ANSWER = 'WRONG_ANSWER',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  COMPILATION_ERROR = 'COMPILATION_ERROR',
}

export type SubmissionProps = {
  id?: string;
  userId: string;
  challengeId: number;
  courseId: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  verdict?: Verdict;
  score?: number;
  executionTime?: number;
  memoryUsed?: number;
  errorMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Submission {
  private constructor(private props: SubmissionProps) {
    this.validate();
  }

  static create(data: {
    userId: string;
    challengeId: number;
    courseId: string;
    code: string;
    language: string;
  }): Submission {
    return new Submission({
      userId: data.userId,
      challengeId: data.challengeId,
      courseId: data.courseId,
      code: data.code,
      language: data.language,
      status: SubmissionStatus.QUEUED,
    });
  }

  static fromPersistence(data: SubmissionProps): Submission {
    return new Submission(data);
  }

  startProcessing(): void {
    if (this.props.status !== SubmissionStatus.QUEUED) {
      throw new Error(
        `Cannot start processing submission in status: ${this.props.status}`
      );
    }
    this.props.status = SubmissionStatus.RUNNING;
  }

  markAsCompleted(result: {
    verdict: Verdict;
    score: number;
    executionTime: number;
    memoryUsed: number;
  }): void {
    if (this.props.status !== SubmissionStatus.RUNNING) {
      throw new Error(
        `Cannot complete submission in status: ${this.props.status}`
      );
    }

    this.props.status = SubmissionStatus.COMPLETED;
    this.props.verdict = result.verdict;
    this.props.score = result.score;
    this.props.executionTime = result.executionTime;
    this.props.memoryUsed = result.memoryUsed;
  }

  markAsFailed(errorMessage: string): void {
    if (this.props.status !== SubmissionStatus.RUNNING) {
      throw new Error(
        `Cannot fail submission in status: ${this.props.status}`
      );
    }

    this.props.status = SubmissionStatus.FAILED;
    this.props.errorMessage = errorMessage;
  }

  canBeRequeued(): boolean {
    return this.props.status === SubmissionStatus.FAILED;
  }

  requeue(): void {
    if (!this.canBeRequeued()) {
      throw new Error('Submission cannot be requeued');
    }

    this.props.status = SubmissionStatus.QUEUED;
    this.props.errorMessage = undefined;
  }

  isAccepted(): boolean {
    return this.props.verdict === Verdict.ACCEPTED;
  }

  isProcessing(): boolean {
    return (
      this.props.status === SubmissionStatus.QUEUED ||
      this.props.status === SubmissionStatus.RUNNING
    );
  }

  // Set ID after persistence (called by repository)
  setId(id: string): void {
    if (this.props.id) {
      throw new Error('ID already set');
    }
    this.props.id = id;
  }

  // Set timestamps after persistence
  setTimestamps(createdAt: Date, updatedAt: Date): void {
    this.props.createdAt = createdAt;
    this.props.updatedAt = updatedAt;
  }

  private validate(): void {
    if (!this.props.userId) {
      throw new Error('User ID is required');
    }
    if (!this.props.challengeId) {
      throw new Error('Challenge ID is required');
    }
    if (!this.props.courseId) {
      throw new Error('Course ID is required');
    }
    if (!this.props.code || this.props.code.trim().length === 0) {
      throw new Error('Code cannot be empty');
    }
    if (!this.props.language) {
      throw new Error('Language is required');
    }
    if (this.props.score !== undefined && (this.props.score < 0 || this.props.score > 100)) {
      throw new Error('Score must be between 0 and 100');
    }
  }

  toObject(): SubmissionProps {
    return { ...this.props };
  }

    get id(): string | undefined {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get challengeId(): number {
    return this.props.challengeId;
  }

  get courseId(): string {
    return this.props.courseId;
  }

  get code(): string {
    return this.props.code;
  }

  get language(): string {
    return this.props.language;
  }

  get status(): SubmissionStatus {
    return this.props.status;
  }

  get verdict(): Verdict | undefined {
    return this.props.verdict;
  }

  get score(): number | undefined {
    return this.props.score;
  }

  get executionTime(): number | undefined {
    return this.props.executionTime;
  }

  get memoryUsed(): number | undefined {
    return this.props.memoryUsed;
  }

  get errorMessage(): string | undefined {
    return this.props.errorMessage;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}