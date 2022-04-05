/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreatePurchaseParams {
    customerId: string;
    productId: string;
}

@Injectable()
export class PurchasesService {
    constructor(private readonly prisma: PrismaService) { }

    async findAllPurchases(): Promise<any> {
        return await this.prisma.purchase.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findPurchaseById(purchaseId: string) {
        return await this.prisma.purchase.findUnique({
            where: {
                id: purchaseId,
            },
        });
    }

    async listPurchasesFromCustomer(customerId: string) {
        return await this.prisma.purchase.findMany({
            where: {
                customerId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async createPurchase({ customerId, productId }: CreatePurchaseParams) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return await this.prisma.purchase.create({
            data: {
                customerId,
                productId
            },
        });
    }
}