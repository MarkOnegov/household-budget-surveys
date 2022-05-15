import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../../common/types/user.types';
import { finalize } from '../../utils/finalize.ustil';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredRolesClass = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getClass(),
    );
    const requiredRolesHandler = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRolesClass && !requiredRolesHandler) {
      return true;
    }
    const res = super.canActivate(context);
    if (!(await finalize(res))) {
      return false;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }
    let roles = requiredRolesClass || requiredRolesHandler;
    if (requiredRolesHandler) {
      roles = roles.filter((role) => requiredRolesHandler.includes(role));
    }
    return roles.some((role) => user.roles.includes(role));
  }
}
