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
import { TenantsModule } from './modules/tenants/tenants.module';
import { CountersModule } from './common/counters/counters.module';

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
    TenantsModule,
    CountersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
