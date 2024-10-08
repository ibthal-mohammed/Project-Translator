import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ProjectModule } from './project/project.module';
import { ConfigModule } from '@nestjs/config';
import { DictionaryModule } from './dictionary/dictionary.module';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    ProjectModule,
    DictionaryModule,
    LanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
