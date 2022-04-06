/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
    title: string;
    slug?: string;
}
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

    async findCourseBySlug(slug: string) {
        return await this.prisma.course.findUnique({
            where: {
                slug,
            },
        });
    }

    async createCourse({ title, slug }: CreateCourseParams) {
        const courseSlug = slug ?? title.toLowerCase().replace(/\s/g, '-');

        const courseAlreadyExists = await this.prisma.course.findUnique({
            where: {
                slug: courseSlug,
            },
        });

        if (courseAlreadyExists) {
            throw new Error('Course already exists');
        }

        return await this.prisma.course.create({
            data: {
                title,
                slug: courseSlug,
            },
        });
    }
}