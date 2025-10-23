import { User } from '../entities/user.entity';

export interface CreateUserDTO {
  email: string;
  password: string; // hashed antes de llamar al repo
  name: string;
  role: 'STUDENT' | 'ADMIN';
}

export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}
