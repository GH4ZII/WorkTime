import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ShiftApplicationsService } from './shift-applications.service';
import { CreateShiftApplicationDto } from './dto/create-shift-application.dto';
import { UpdateShiftApplicationDto } from './dto/update-shift-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('shift-applications')
@UseGuards(JwtAuthGuard)
export class ShiftApplicationsController {
  constructor(private readonly shiftApplicationsService: ShiftApplicationsService) {}

  @Post()
  create(@Body() createShiftApplicationDto: CreateShiftApplicationDto, @Request() req) {
    // Bruk bruker-ID fra JWT-token
    createShiftApplicationDto.userId = req.user.id;
    return this.shiftApplicationsService.create(createShiftApplicationDto);
  }

  @Get()
  findAll() {
    return this.shiftApplicationsService.findAll();
  }

  @Get('my-applications')
  findMyApplications(@Request() req) {
    return this.shiftApplicationsService.findByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftApplicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShiftApplicationDto: UpdateShiftApplicationDto,
  ) {
    return this.shiftApplicationsService.update(id, updateShiftApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftApplicationsService.remove(id);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string) {
    return this.shiftApplicationsService.update(id, { status: 'APPROVED' });
  }

  @Post(':id/reject')
  reject(@Param('id') id: string) {
    return this.shiftApplicationsService.update(id, { status: 'REJECTED' });
  }
}
