import { Controller, Get, Put, Post, Delete, Body, Param} from "@nestjs/common";
import { TimeOffReqService } from "./timeOffReq.service";
import { CreateTimeOffRequestDto } from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";

@Controller('time-off-requests')  // Basestien for alle path-ene her
export class TimeOffReqController {
    constructor(private readonly service: TimeOffReqService) {}

    @Post()  // Når klienten sender POST /time-off-requests ...
    create(@Body() dto: CreateTimeOffRequestDto) {
        return this.service.create(dto);
    }

    @Get()   // Når klienten sender GET /time-off-requests ...
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')  // GET /time-off-requests/123 ...
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')  // PUT /time-off-requests/123 ...
    update(@Param('id') id: string, @Body() dto: UpdateTimeOffRequestDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id') // DELETE /time-off-requests/123 ...
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}

