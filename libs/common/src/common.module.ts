import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import {RolesGuard} from "@app/common/guards/roles.guard";
import {JwtStrategy} from "@app/common/strategy/jwt.strategy";

@Module({
  providers: [
      CommonService, RolesGuard, JwtStrategy
  ],
  exports: [
      CommonService, RolesGuard, JwtStrategy
  ],
})
export class CommonModule {}
