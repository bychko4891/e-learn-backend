import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT_USER') || 3000;

    // Підключаємо мікросервіс Kafka
    app.connectMicroservice({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: configService.getOrThrow<string>('KAFKA_BROKERS').split(','),
                retry: {
                    initialRetryTime: 300,
                    retries: 8,
                },
            },
            consumer: {
                // Дуже важливо! Кожен consumer в одній групі отримає повідомлення
                // тільки один раз. Це забезпечує обробку "at-most-once".
                groupId: 'user-service-consumer',
            },
        },
    });

    // Запускаємо всі мікросервіси та веб-сервер (якщо він потрібен)
    await app.startAllMicroservices();

    await app.listen(port);
}
bootstrap();