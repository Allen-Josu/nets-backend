import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './schema/counter.schema';

@Injectable()
export class CountersService {
    constructor(
        @InjectModel(Counter.name)
        private counterModel: Model<Counter>,
    ) { }

    async incrementCounter(prefix: string): Promise<string> {
        const counter = await this.counterModel.findOneAndUpdate(
            { key: prefix },
            { $inc: { seq: 1 } },
            {
                new: true,
                upsert: true,
            },
        );

        if (!counter) {
            throw new InternalServerErrorException('An error has occurred');
        }

        const seq = counter.seq;

        const formattedSeq =
            seq < 1000 ? String(seq).padStart(3, '0') : String(seq);

        return `${prefix}-${formattedSeq}`;
    }
}