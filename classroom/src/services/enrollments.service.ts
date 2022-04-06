/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateEnrollmentParams {
    courseId: string;
    studentId: string;
}
interface findEnrollmentByCourseAndStudentParams {
    courseId: string;
    studentId: string;
}

@Injectable()
export class EnrollmentsService {
    constructor(private prisma: PrismaService) { }

    findAllEnrollments() {
        return this.prisma.enrollment.findMany({
            where: {
                canceledAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findEnrollmentByStudent(studentId: string) {
        return this.prisma.enrollment.findMany({
            where: {
                studentId,
                canceledAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findEnrollmentByCourseAndStudent({ courseId, studentId }: findEnrollmentByCourseAndStudentParams) {
        return this.prisma.enrollment.findFirst({
            where: {
                courseId,
                studentId,
                canceledAt: null,
            },
        });
    }

    createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
        return this.prisma.enrollment.create({
            data: {
                courseId,
                studentId,
            },
        });
    }
}
