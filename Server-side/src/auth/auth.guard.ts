import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest().header('Authorization');
    console.log('request is ' + request + 'End');
    if (!request) return false;
    else return true;
  }
}
