/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async findAllStudents() {
        return await this.prisma.student.findMany();
    }

    async findStudentById(studentId: string) {
        return await this.prisma.student.findUnique({
            where: {
                id: studentId,
            },
        });
    }

    async findStudentByAuthUserId(authUserId: string) {
        return await this.prisma.student.findUnique({
            where: {
                authUserId,
            },
        });
    }
}
