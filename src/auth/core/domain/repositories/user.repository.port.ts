import { User } from '../entities/user.entity';

export interface CreateUserDTO {
  email: string;
  password: string; // hashed antes de llamar al repo
  name: string;
  role: 'STUDENT' | 'ADMIN';
}

export abstract class UserRepositoryPort {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: CreateUserDTO): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
