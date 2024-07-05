import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
