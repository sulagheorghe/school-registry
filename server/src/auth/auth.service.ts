import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';
import { CryptographerService } from './cryptographer.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Teacher } from 'src/teacher/teacher.entity';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(
        private readonly teacherService: TeacherService,
        private readonly cryptoService: CryptographerService,
        private readonly JwtService: JwtService) { }

    public async logInTeacher(email, password) {
        const teacher = await this.teacherService.getOne({ email: email });
        if (!teacher) {
            throw new UnauthorizedException();
        }
        return await this.cryptoService.checkPassword(teacher.password, password)
            ? Promise.resolve(teacher)
            : Promise.reject(new UnauthorizedException())
    }

    public async validatePayloadforTeacher(payload: JwtPayload): Promise<Teacher> {
        const teacher = this.teacherService.getOne({ email: payload.email });
        if (!teacher) {
            throw new UnauthorizedException();
        }
        return teacher;
    }

    public async createToken(signedUser) {
        const user = {
            email: signedUser.email,
        };
        return {
            access_token: await this.JwtService.sign(user)
        }
    }

}
