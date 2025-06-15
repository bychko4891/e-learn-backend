import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";

process.env.TZ = process.env.TZ || 'Europe/Kiev';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT_MEDIA') || 3003;
    app.useGlobalFilters(new AllExceptionsFilter());

    // await app.listen(port);
    // console.log("date now -->" + new Date())
    await app.listen(port, () => {
        console.log(`✅ Сервер успішно запущено на порту: ${port}`);
        console.log(`🕒 Поточний час сервера: ${new Date().toLocaleString('uk-UA')}`);
    });
}
bootstrap();