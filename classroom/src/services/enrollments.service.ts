/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface findEnrollmentByCourseAndStudentParams {
    courseId: string;
    studentId: string;
}

@Injectable()
export class EnrollmentsService {
    constructor(private prisma: PrismaService) { }

    async findAllEnrollments() {
        return await this.prisma.enrollment.findMany({
            where: {
                canceledAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findEnrollmentByStudent(studentId: string) {
        return await this.prisma.enrollment.findMany({
            where: {
                studentId,
                canceledAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findEnrollmentByCourseAndStudent({ courseId, studentId }: findEnrollmentByCourseAndStudentParams) {
        return await this.prisma.enrollment.findFirst({
            where: {
                courseId,
                studentId,
                canceledAt: null,
            },
        });
    }
}
