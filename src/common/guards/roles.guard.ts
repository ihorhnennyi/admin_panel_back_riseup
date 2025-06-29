import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		// Получаем роли, указанные через декоратор @Roles
		const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
			context.getHandler(),
			context.getClass(),
		])

		// Если роли не заданы — доступ разрешён
		if (!requiredRoles || requiredRoles.length === 0) return true

		// Получаем текущего пользователя из запроса
		const { user } = context.switchToHttp().getRequest()

		// Проверка наличия пользователя и его роли
		if (!user || !requiredRoles.includes(user.role)) {
			throw new ForbiddenException('Недостаточно прав для доступа')
		}

		return true
	}
}
