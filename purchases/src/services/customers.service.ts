/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCustomerParams {
    authUserId: string;
}

@Injectable()
export class CustomersService {
    constructor(private readonly prisma: PrismaService) { }

    async findCustomerByAuthUserId(authUserId: string): Promise<any> {
        return await this.prisma.customer.findUnique({
            where: {
                authUserId,
            },
        });
    }

    async createCustomer({ authUserId }: CreateCustomerParams) {
        return await this.prisma.customer.create({
            data: {
                authUserId,
            },
        });
    }
}