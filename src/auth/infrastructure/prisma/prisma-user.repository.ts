import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { UserRepositoryPort, CreateUserDTO } from '../../core/domain/repositories/user.repository.port';
import { User } from '../../core/domain/entities/user.entity';


@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(record: any): User {
    if (!record) return null;
    return new User(
      record.id,
      record.email,
      record.password,
      record.name,
      record.role,
    );
  }

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return this.mapToDomain(record);
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    return this.mapToDomain(record);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const record = await this.prisma.user.create({ data });
    return this.mapToDomain(record);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
