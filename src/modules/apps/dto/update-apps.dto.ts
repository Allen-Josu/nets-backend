import { PartialType } from '@nestjs/mapped-types';
import { CreateAppsDto } from './create-apps.dto';

export class UpdateAppsDto extends PartialType(CreateAppsDto) { }
