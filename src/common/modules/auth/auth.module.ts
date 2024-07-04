import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [JwtStrategy, JwtService],
  controllers: [],
  exports: [JwtStrategy, JwtService, PassportModule],
})
export class AuthModule {}
