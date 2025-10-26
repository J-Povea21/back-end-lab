import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { IJobQueue } from "../ports/job-queue.port";
import { InjectQueue } from "@nestjs/bullmq";

@Injectable()
export class BullMqAdapter implements IJobQueue { 
    constructor(@InjectQueue('submissionQueue') private readonly submissionQueue: Queue) {}

    async addJob(name: string, data: any): Promise<void> {
        await this.submissionQueue.add(name, data);
    }
}