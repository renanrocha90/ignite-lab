/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

import { CustomersService } from 'src/services/customers.service';
import { PurchasesService } from 'src/services/purchases.service';

import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
    constructor(
        private customersService: CustomersService,
        private purchasesService: PurchasesService) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => [Customer])
    me(@CurrentUser() user: AuthUser) {
        return this.customersService.findCustomerByAuthUserId(user.sub);
    }

    @ResolveField()
    purchases(
        @Parent() customer: Customer) {
        return this.purchasesService.listPurchasesFromCustomer(customer.id);
    }
}