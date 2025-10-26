import { Get, Post, Put, Delete, Body, Param, Controller, Request } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateChallengeUsecase } from '../../core/application/usecases/create-challenge.usecases';
import { UpdateChallengeUsecase } from '../../core/application/usecases/update-challenge.usecases';
import { DeleteChallengeUsecase } from '../../core/application/usecases/delete-challenge.usecases';
import { GetChallengeUsecase } from '../../core/application/usecases/get-challenge.usecases';
import { ListsChallengeUsecase } from '../../core/application/usecases/lists-challenge.usecases';
import { toChallengeDto } from '../../core/application/mappers/challenge.mapper';
import { ChallengeDifficulty } from '../../core/domain/enums/challenge-difficulty';
import { ChallengeStatus } from '../../core/domain/enums/challenge-status';

class CreateChallengeRequest {
  @ApiProperty() title!: string;
  @ApiProperty() description!: string;
  @ApiProperty() difficulty!: ChallengeDifficulty;
  @ApiProperty() tags!: string[];
  @ApiProperty() timeLimit!: number;
  @ApiProperty() memoryLimit!: number;
  @ApiProperty() status!: ChallengeStatus;
  @ApiProperty() courseId!: string;
}

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
    async create(@Body() body: CreateChallengeRequest, @Request() req: any) {
        const challenge = await this.createChallenge.execute({
            ...body,
            creatorId: req.user.id, 
        });
        return toChallengeDto(challenge);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: CreateChallengeRequest, @Request() req: any) {
        const challenge = await this.updateChallenge.execute({
            id: parseInt(id),
            ...body,
            creatorId: req.user.id,
        });
        return toChallengeDto(challenge);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req: any) {
        await this.deleteChallenge.execute(parseInt(id));
        return { message: 'Challenge deleted successfully' };
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        const challenge = await this.getChallenge.execute(parseInt(id));
        return toChallengeDto(challenge);
    }

    @Get()
    async list() {
        const challenges = await this.listsChallenge.execute();
        return challenges.map(toChallengeDto);
    }
}