import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenants, TenantsSchema } from './schema/tenants.schema';
import { CountersModule } from 'src/common/counters/counters.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenants.name, schema: TenantsSchema }]),
    CountersModule
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule { }
