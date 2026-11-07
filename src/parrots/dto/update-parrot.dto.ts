import { PartialType } from '@nestjs/swagger';
import { CreateParrotDto } from './create-parrot.dto.js';

export class UpdateParrotDto extends PartialType(CreateParrotDto) {}
