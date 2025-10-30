import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateSubmissionUseCase } from "@submission/core/application/use-cases/create-submission.use-case";
import { CreateSubmissionDto } from "@submission/core/application/dto/create-submission.dto";

@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionController {
    constructor(
        private readonly createSubmissionUseCase: CreateSubmissionUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Submit a solution for a challenge' })
    @ApiResponse({
        status: 201,
        description: 'Submission created successfully',
        schema: {
            example: {
                submissionId: 'c7e7e980-23d1-4a8f-bda2-d00e71d9aa3d'
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Invalid submission data' })
    @ApiBody({ type: CreateSubmissionDto })
    async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto): Promise<{ submissionId: string }> {
        // Due to the fact that we don't everything setup, here we hardcode some data so test if everything is working correctly
        const userId = "ee110752-865e-4314-97b7-52c028dac5b9"; // Hardcoded user id
        const submissionId = await this.createSubmissionUseCase.execute({
            userId,
            ...createSubmissionDto
        });
        return { submissionId };
    }
}