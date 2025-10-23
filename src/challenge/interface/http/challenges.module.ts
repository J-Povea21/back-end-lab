import { ChallengesController } from './challenges.controller';
import { CreateChallengeUsecase } from '../../core/application/usecases/create-challenge.usecases';
import { UpdateChallengeUsecase } from '../../core/application/usecases/update-challenge.usecases';
import { DeleteChallengeUsecase } from '../../core/application/usecases/delete-challenge.usecases';
import { GetChallengeUsecase } from '../../core/application/usecases/get-challenge.usecases';
import { ListsChallengeUsecase } from '../../core/application/usecases/lists-challenge.usecases';
import { PrismaChallengeRepository } from 'src/challenge/infrastructure/prisma/prisma-challenge.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/challenge/infrastructure/database/prisma.service';

@Module({
    controllers: [ChallengesController],
    providers: [{
        provide: 'ChallengeRepositoryPort',
        useClass: PrismaChallengeRepository,
    },
        CreateChallengeUsecase, 
        UpdateChallengeUsecase, 
        DeleteChallengeUsecase, 
        GetChallengeUsecase, 
        ListsChallengeUsecase],
    imports: [PrismaService],
})
export class ChallengesHttpModule {}