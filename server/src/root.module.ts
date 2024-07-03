import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Environment } from './shared/variables/environment';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: Environment.DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    FileModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class RootModule {}
