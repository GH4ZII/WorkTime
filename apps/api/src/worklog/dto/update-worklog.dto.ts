import {PartialType} from "@nestjs/mapped-types";
import {CreateWorklogDto} from "./create-worklog.dto";

export class UpdateWorklogDto extends PartialType(CreateWorklogDto) {}
