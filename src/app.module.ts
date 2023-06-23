import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { MediaModule } from './media/media.module';
import { Media } from './entities/media.entity';
import { FixturesModule } from './fixtures/fixtures.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/entities/*.entity{.ts,.js}"],
      synchronize: !!process.env.DB_SYNC || false,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    EmailModule, 
    UsersModule,
    MediaModule,
    FixturesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
