import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/translator'),
    JwtModule.register({ secret: '123' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
