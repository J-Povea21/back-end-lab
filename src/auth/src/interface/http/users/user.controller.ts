import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../../../core/application/usecases/register-user.usecase';
import { LoginUserUseCase } from '../../../core/application/usecases/login-user.usecase';
import { RegisterUserDTO } from '../../../core/application/dto/register-user.dto';
import { LoginUserDTO } from '../../../core/application/dto/login-user.dto';
import { User } from '../../../core/domain/entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  // --- REGISTER ENDPOINT ---
  @Post('register')
  @ApiOperation({ summary: 'Register a new user (STUDENT or ADMIN)' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Email already registered' })
  @ApiBody({ type: RegisterUserDTO })
  async register(@Body() body: RegisterUserDTO): Promise<Omit<User, 'password'>> {
    const user = await this.registerUserUseCase.execute(body);
    // no devolver la password
    const { password, ...result } = user;
    return result;
  }

  // --- LOGIN ENDPOINT ---
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Successful login. Returns JWT token and user data',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'c7e7e980-23d1-4a8f-bda2-d00e71d9aa3d',
          name: 'Admin',
          email: 'admin@domain.com',
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginUserDTO })
  async login(@Body() body: LoginUserDTO) {
    return this.loginUserUseCase.execute(body);
  }
}
