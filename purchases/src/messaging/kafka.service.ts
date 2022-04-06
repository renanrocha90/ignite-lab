/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService
    extends ClientKafka
    implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        super({
            client: {
                clientId: 'purchases',
                brokers: [configService.get('KAFKA_BROKERS')],
            },
        });
    }

    public onModuleInit(): void {
        this.connect();
    }

    public onModuleDestroy(): void {
        this.close();
    }
}
