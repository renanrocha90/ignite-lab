/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType()
export class Course {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    slug: string;

    @Field(() => [Enrollment])
    enrollments: Enrollment[];
}