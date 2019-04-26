import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptographerService } from './cryptographer.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CryptographerService, JwtStrategy],
  imports: [
    TeacherModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  exports: [
    PassportModule,
    AuthService
  ]
})
export class AuthModule { }
