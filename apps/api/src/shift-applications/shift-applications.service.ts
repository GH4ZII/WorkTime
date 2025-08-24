import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateShiftApplicationDto } from './dto/create-shift-application.dto';
import { UpdateShiftApplicationDto } from './dto/update-shift-application.dto';

@Injectable()
export class ShiftApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(createShiftApplicationDto: CreateShiftApplicationDto) {
    return this.prisma.shiftApplication.create({
      data: createShiftApplicationDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        shift: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            location: true,
            notes: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.shiftApplication.findMany({
      where: { isHidden: false },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        shift: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            location: true,
            notes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.shiftApplication.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        shift: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            location: true,
            notes: true,
          },
        },
      },
    });
  }

  async update(id: string, updateShiftApplicationDto: UpdateShiftApplicationDto) {
    const updated = await this.prisma.shiftApplication.update({
      where: { id },
      data: updateShiftApplicationDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        shift: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            location: true,
            notes: true,
          },
        },
      },
    });

    // Hvis søknaden er godkjent, oppdater skiftet med den nye brukeren
    if (updateShiftApplicationDto.status === 'APPROVED') {
      await this.prisma.shift.update({
        where: { id: updated.shiftId },
        data: {
          userId: updated.userId,
          isAvailableShift: false,
        },
      });
    }

    return updated;
  }

  async remove(id: string) {
    // Sjekk at søknaden finnes
    await this.findOne(id);

    // Bruk hide i stedet for delete - dette bevarer data men skjuler den
    return this.prisma.shiftApplication.update({
      where: { id },
      data: { isHidden: true }
    });
  }

  async hide(id: string) {
    const application = await this.findOne(id);
    
    if (!application) {
      throw new Error('Søknad ikke funnet');
    }

    return this.prisma.shiftApplication.update({
      where: { id },
      data: { isHidden: true }
    });
  }

  async findByUser(userId: string) {
    return this.prisma.shiftApplication.findMany({
      where: { 
        userId,
        isHidden: false 
      },
      include: {
        shift: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            location: true,
            notes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByShift(shiftId: string) {
    return this.prisma.shiftApplication.findMany({
      where: { 
        shiftId,
        isHidden: false 
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
