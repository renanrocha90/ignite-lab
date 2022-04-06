/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsService: ProductsService,
        private customersService: CustomersService,
    ) { }

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases() {
        return this.purchasesService.findAllPurchases();
    }

    @ResolveField()
    product(
        @Parent() purchase: Purchase) {
        return this.productsService.findProductById(purchase.productId);
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    async createPurchase(
        @Args('data') data: CreatePurchaseInput,
        @CurrentUser() user: AuthUser,
    ) {

        let customer = await this.customersService.findCustomerByAuthUserId(
            user.sub
        );

        if (!customer) {
            customer = await this.customersService.createCustomer({
                authUserId: user.sub,
            });
        }

        return this.purchasesService.createPurchase({
            customerId: customer.id,
            productId: data.productId,
        });
    }
}