import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { finalize } from '../../utils/finalize.ustil';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  async canActivate(context: ExecutionContext) {
    const res = super.canActivate(context);
    if (!(await finalize(res))) {
      return false;
    }
    return true;
  }
}
