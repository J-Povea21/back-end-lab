import { Get, Post, Put, Delete, Body, Param, Controller, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateChallengeUsecase } from '../../core/application/usecases/create-challenge.usecases';
import { UpdateChallengeUsecase } from '../../core/application/usecases/update-challenge.usecases';
import { DeleteChallengeUsecase } from '../../core/application/usecases/delete-challenge.usecases';
import { GetChallengeUsecase } from '../../core/application/usecases/get-challenge.usecases';
import { ListsChallengeUsecase } from '../../core/application/usecases/lists-challenge.usecases';
import { CreateChallengeDto } from '../../core/application/dto/create-challenge.dto';
import { UpdateChallengeDto } from '../../core/application/dto/update-challenge.dto';
import { ChallengeDto } from '../../core/application/dto/challenge.dto';
import { toChallengeDto } from '../../core/application/mappers/challenge.mapper';

@ApiTags('challenges')
@Controller('challenges')

export class ChallengesController {
    constructor(
        private readonly createChallenge: CreateChallengeUsecase,
        private readonly updateChallenge: UpdateChallengeUsecase,
        private readonly deleteChallenge: DeleteChallengeUsecase,
        private readonly getChallenge: GetChallengeUsecase,
        private readonly listsChallenge: ListsChallengeUsecase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new challenge' })
    @ApiResponse({
        status: 201,
        description: 'Challenge created successfully',
        type: ChallengeDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid challenge data' })
    @ApiBody({ type: CreateChallengeDto })
    async create(@Body() body: CreateChallengeDto, @Request() req: any) {
        // TODO: In the future, get creatorId from req.user.id after authentication is implemented
        const creatorId = '598e0afa-acea-49d7-8aa0-f24d7f231b6f'; // Hardcoded for now
        const challenge = await this.createChallenge.execute({
            ...body,
            creatorId,
        });
        return toChallengeDto(challenge);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing challenge' })
    @ApiResponse({
        status: 200,
        description: 'Challenge updated successfully',
        type: ChallengeDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid challenge data' })
    @ApiResponse({ status: 404, description: 'Challenge not found' })
    @ApiBody({ type: UpdateChallengeDto })
    async update(@Param('id') id: string, @Body() body: UpdateChallengeDto, @Request() req: any) {
        // TODO: In the future, get creatorId from req.user.id after authentication is implemented
        const creatorId = '598e0afa-acea-49d7-8aa0-f24d7f231b6f'; // Hardcoded for now
        const challenge = await this.updateChallenge.execute({
            id: parseInt(id),
            ...body,
            creatorId,
        });
        return toChallengeDto(challenge);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a challenge' })
    @ApiResponse({
        status: 200,
        description: 'Challenge deleted successfully',
    })
    @ApiResponse({ status: 404, description: 'Challenge not found' })
    async delete(@Param('id') id: string, @Request() req: any) {
        await this.deleteChallenge.execute(parseInt(id));
        return { message: 'Challenge deleted successfully' };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a challenge by ID' })
    @ApiResponse({
        status: 200,
        description: 'Challenge found',
        type: ChallengeDto,
    })
    @ApiResponse({ status: 404, description: 'Challenge not found' })
    async get(@Param('id') id: string) {
        const challenge = await this.getChallenge.execute(parseInt(id));
        return toChallengeDto(challenge);
    }

    @Get()
    @ApiOperation({ summary: 'List all challenges' })
    @ApiResponse({
        status: 200,
        description: 'List of challenges',
        type: [ChallengeDto],
    })
    async list() {
        const challenges = await this.listsChallenge.execute();
        return challenges.map(toChallengeDto);
    }
}