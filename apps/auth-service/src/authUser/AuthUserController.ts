import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus, InternalServerErrorException,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {AuthUserService} from "./AuthUserService";
import {Roles} from "@app/common/decorators/roles.decorator";
import {Role} from "@app/common/enums/role.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "@app/common/guards/roles.guard";
import {SignupDto} from "./dto/SignupDto";

@Controller("/api/v1/auth-user")
export class AuthUserController {

    constructor(
        private readonly authUserService: AuthUserService
    ) {}

    @Post("/signup")
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async signup(@Body() signupDto: SignupDto) {
        try {
            await this.authUserService.sighup(signupDto);
        } catch (error) {
            throw new InternalServerErrorException("Internal error during signup");
        }

    }

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getHello() {
        return { message: '✅ Все працює!' };
    }

}