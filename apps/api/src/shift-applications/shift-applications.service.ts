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
    return this.prisma.shiftApplication.delete({
      where: { id },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.shiftApplication.findMany({
      where: { userId },
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
      where: { shiftId },
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
