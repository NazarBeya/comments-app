import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('userAvatar'))
  register(@Body() dto: AuthDto, @UploadedFile() file: Express.Multer.File) {
    return this.authService.register(dto, file);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
