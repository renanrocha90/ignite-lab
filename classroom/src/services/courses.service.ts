/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) { }

    async findAllCourses() {
        return await this.prisma.course.findMany();
    }

    async findCourseById(courseId: string) {
        return await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });
    }

    async createCourse({ title }) {
        const slug = title.toLowerCase().replace(/\s/g, '-');

        const courseAlreadyExists = await this.prisma.course.findUnique({
            where: {
                slug,
            },
        });

        if (courseAlreadyExists) {
            throw new Error('Course already exists');
        }

        return await this.prisma.course.create({
            data: {
                title,
                slug,
            },
        });
    }
}