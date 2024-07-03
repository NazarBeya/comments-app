import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Environment } from './shared/variables/environment';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { CommentsModule } from './comments/comments.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: Environment.DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    FileModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class RootModule {}
