import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorator/role.decorator";
import { Role } from "../enum/roles.enum";
import { Permission } from "src/enum/permission.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<Permission[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermission) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPermission.some((permission) => user.permissions?.includes(permission));
  }
}