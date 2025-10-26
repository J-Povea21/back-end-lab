export abstract class IJobQueue {
    abstract addJob<T>(jobName: string, data: T): Promise<void>;
}