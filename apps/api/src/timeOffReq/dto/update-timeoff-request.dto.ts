import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeOffRequestDto} from "./create-timeoff-request.dto";

export class UpdateTimeOffRequestDto extends PartialType(CreateTimeOffRequestDto) {}
