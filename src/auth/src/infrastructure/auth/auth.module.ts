import { Module, Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy {
  constructor(private readonly jwtService: JwtService) {}

  async validate(payload: any) {
    // Minimal validation: return the payload as the validated user object.
    // Expand this with real validation logic as needed.
    return payload;
  }
}

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
