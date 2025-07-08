import { Controller, Get, Put, Post, Delete, Body, Param } from "@nestjs/common";
import { ShiftSwapReqService } from "./shiftSwapReq.service";
import { CreateShiftSwapRequestDto } from "./dto/create-shiftswap-request.dto";
import { UpdateShiftSwapRequestDto } from "./dto/update-shiftswap-request.dto";

@Controller('shift-swap-requests')  // Basestien for alle path-ene her
export class ShiftSwapReqController {
    constructor(private readonly service: ShiftSwapReqService) {}

    @Post() // Når klienten sender POST /shift-swap-requests ...
    create(@Body() dto: CreateShiftSwapRequestDto) {
        return this.service.create(dto);
    }

    @Get() // Når klienten sender GET /shift-swap-requests ...
    findAll() {
        return this.service.findAll();
    }

    @Get(':id') // GET /shift-swap-requests/123 ...
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id') // PUT /shift-swap-requests/123 ...
    update(@Param('id') id: string, @Body() dto: UpdateShiftSwapRequestDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id') // DELETE /shift-swap-requests/123 ...
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
