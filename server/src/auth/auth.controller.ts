import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDetails: { email: string, password: string }) {
    const { email, password } = loginDetails;
    return this.authService.logInTeacher(email, password)
      .then(async teacher => await this.authService.createToken(teacher))
  }
}
