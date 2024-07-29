import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegAuthDto } from './dto/reg-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  Login(
    @Body() LoginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.Login(LoginAuthDto, res);
  }
  @UsePipes(ValidationPipe)
  @Post('signup')
  Reg(@Body() regAuthDto: RegAuthDto) {
    return this.authService.Register(regAuthDto);
  }
}
