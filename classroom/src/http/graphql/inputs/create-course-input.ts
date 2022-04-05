/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
    @Field()
    title: string;
}
