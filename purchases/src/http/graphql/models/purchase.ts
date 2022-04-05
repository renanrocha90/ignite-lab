/* eslint-disable prettier/prettier */

import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Product } from "./product";

enum PurchaseStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    CANCELLED = "CANCELLED",
}

registerEnumType(PurchaseStatus, {
    name: "PurchaseStatus",
    description: "The status of a purchase",
});

@ObjectType()
export class Purchase {
    @Field(() => ID)
    id: string;

    @Field(() => PurchaseStatus)
    status: PurchaseStatus;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Product)
    product: Product;

    productId: string;
}