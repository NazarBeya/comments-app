import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dtos/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Environment } from 'src/shared/variables/environment';
import { FileService, fileType } from 'src/file/file.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly fileService: FileService,
  ) {}

  async register(dto: AuthDto, file: Express.Multer.File) {
    const { email, username, password } = dto;

    const isUserExist = await this.userRepository.findOneBy([
      { email },
      { username },
    ]);

    if (isUserExist) {
      throw new BadRequestException('User already exist');
    }

    const avatar = await this.fileService.createFile(file, fileType.userAvatar);

    const salt = await genSalt(10);

    const user = await this.userRepository.save({
      ...dto,
      avatar,
      password: await hash(password, salt),
    });

    const token = await this.issueAccessToken(user.id);

    return {
      user,
      ...token,
    };
  }

  async login(dto: AuthDto) {
    const { email, password, username } = dto;
    const user = await this.userRepository.findOneBy({ email, username });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const deHashPassword = await compare(password, user.password);

    if (!deHashPassword) {
      throw new BadRequestException('Invalid password');
    }
    const token = await this.issueAccessToken(user.id);
    return {
      user,
      ...token,
    };
  }

  async issueAccessToken(userId: number) {
    const token = sign({ userId: userId }, Environment.JWT_SECRET, {
      expiresIn: '7d',
    });
    return { token };
  }
}
