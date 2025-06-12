import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { JwksClient } from 'jwks-rsa'; // Більш просунутий варіант з кешуванням

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // Ми не надаємо ключ напряму, а використовуємо функцію-провайдер
            secretOrKeyProvider: (request, rawJwtToken, done) => {
                // Ця функція буде викликана для отримання ключа
                this.getPublicKey()
                    .then(key => done(null, key))
                    .catch(err => done(err));
            },
        });
    }

    // Зберігаємо ключ в пам'яті, щоб не робити запит кожного разу
    private publicKey: string | null = null;

    private async getPublicKey(): Promise<string> {
        if (this.publicKey) {
            return this.publicKey;
        }

        const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
        if (!authServiceUrl) {
            throw new Error('AUTH_SERVICE_URL is not defined in environment variables');
        }

        try {
            console.log(`Fetching public key from ${authServiceUrl}/auth/public-key`);
            const response = await firstValueFrom(
                this.httpService.get<{ publicKey: string }>(`${authServiceUrl}/auth/public-key`)
            );
            this.publicKey = response.data.publicKey;
            return this.publicKey;
        } catch (error) {
            throw new UnauthorizedException('Could not retrieve public key to validate token.');
        }
    }

    // Цей метод виконується ПІСЛЯ успішної валідації токена
    async validate(payload: any) {
        // payload - це розшифрований вміст токена
        return { id: payload.sub, role: payload.role };
    }
}