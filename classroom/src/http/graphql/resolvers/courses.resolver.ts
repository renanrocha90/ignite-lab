/* eslint-disable prettier/prettier */
import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
    constructor(
        private coursesService: CoursesService,
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentsService
    ) { }

    @Query(() => [Course])
    // @UseGuards(AuthorizationGuard)
    courses() {
        return this.coursesService.findAllCourses();
    }

    @Query(() => Course)
    // @UseGuards(AuthorizationGuard)
    async course(
        @Args('id') id: string,
        @CurrentUser() user: AuthUser) {
        const student = await this.studentsService.findStudentByAuthUserId(user.sub);

        if (!student) {
            throw new Error('Student not found');
        }

        const enrollment = await this.enrollmentsService.findEnrollmentByCourseAndStudent({
            courseId: id,
            studentId: student.id,
        });

        if (!enrollment) {
            throw new UnauthorizedException();
        }
    }

    @Mutation(() => Course)
    // @UseGuards(AuthorizationGuard)
    createCourse(
        @Args('data') data: CreateCourseInput,
    ) {
        return this.coursesService.createCourse(data);
    }
}