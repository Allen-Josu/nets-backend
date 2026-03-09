import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import config from './config/config';
import { MongoModule } from './database/mongo.module';
import { AuthModule } from './core/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { AppsModule } from './modules/apps/apps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongoModule,
    UsersModule,
    AuthModule,
    RolesModule,
    AppsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
