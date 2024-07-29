import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegAuthDto } from './dto/reg-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  Login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.Login(loginAuthDto);
  }
  @UsePipes(ValidationPipe)
  @Post('signup')
  Reg(@Body() regAuthDto: RegAuthDto) {
    return this.authService.Register(regAuthDto);
  }
}
