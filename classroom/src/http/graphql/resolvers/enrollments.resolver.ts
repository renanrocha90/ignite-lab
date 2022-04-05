/* eslint-disable prettier/prettier */
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
    constructor(
        private enrollmentsService: EnrollmentsService,
        private studentsService: StudentsService,
        private courssService: CoursesService,
    ) { }

    @Query(() => [Enrollment])
    // @UseGuards(AuthorizationGuard)
    async enrollments() {
        return this.enrollmentsService.findAllEnrollments();
    }

    @ResolveField()
    student(@Parent() enrollment: Enrollment) {
        return this.studentsService.findStudentById(enrollment.studentId);
    }

    @ResolveField()
    course(@Parent() enrollment: Enrollment) {
        return this.courssService.findCourseById(enrollment.courseId);
    }
}