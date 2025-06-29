// apps/api/src/shifts/shifts.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')  // Basestien for alle path-ene her
export class ShiftsController {
    constructor(private readonly service: ShiftsService) {}

    @Post()  // Når klienten sender POST /shifts ...
    create(@Body() dto: CreateShiftDto) {
        return this.service.create(dto);
    }

    @Get()   // Når klienten sender GET /shifts ...
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')  // GET /shifts/123 ...
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')  // PUT /shifts/123 ...
    update(@Param('id') id: string, @Body() dto: UpdateShiftDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id') // DELETE /shifts/123 ...
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
