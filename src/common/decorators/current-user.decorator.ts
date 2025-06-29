import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayload } from '../../auth/types/jwt-payload.interface'

/**
 * Получает текущего авторизованного пользователя из JWT токена
 */
export const CurrentUser = createParamDecorator(
	(_: unknown, ctx: ExecutionContext): JwtPayload => {
		const request = ctx.switchToHttp().getRequest()
		return request.user
	}
)
