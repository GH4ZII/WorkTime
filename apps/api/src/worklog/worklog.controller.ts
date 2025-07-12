import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { CreateWorklogDto } from "./dto/create-worklog.dto";
import { UpdateWorklogDto } from "./dto/update-worklog.dto";
import { WorklogService } from "./worklog.service";

@Controller('worklog')
export class WorklogController {
    constructor(private readonly worklogService: WorklogService) {}

    @Post()
    create(@Body() dto: CreateWorklogDto) {
        return this.worklogService.create(dto);
    }

    @Get()
    findAll() {
        return this.worklogService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.worklogService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateWorklogDto) {
        return this.worklogService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.worklogService.remove(id);
    }
}
