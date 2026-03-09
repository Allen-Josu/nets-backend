import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { Counter, CounterSchema } from './schema/counter.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),

  ],
  providers: [CountersService],
  exports: [CountersService]
})
export class CountersModule { }
