import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {RolesGuard} from "@app/common/guards/roles.guard";
import {Role} from "@app/common/enums/role.enum";
import {Roles} from "@app/common/decorators/roles.decorator";

@Controller("/api/v1/users")
export class BaseUserController {

    @Get('me')
    @Roles(Role.USER, Role.ADMIN, Role.MODERATOR) // Доступ для будь-якого залогіненого юзера
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    getProfile() {
        return { message: 'This is your profile data from User Service!' };
    }
}