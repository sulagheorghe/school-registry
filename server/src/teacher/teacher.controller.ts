import { Controller, Get, Req, Post } from '@nestjs/common';

@Controller('teachers')
export class TeacherController {
    @Post('login')
    loginAction(@Req() request) {
        console.log(request.body); 
        return request.body;
    }
    
}
