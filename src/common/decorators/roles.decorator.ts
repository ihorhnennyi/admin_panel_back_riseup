import { SetMetadata } from '@nestjs/common'

/**
 * Декоратор для указания ролей, которым доступен эндпоинт
 * Пример: @Roles('admin', 'recruiter')
 */
export const Roles = (...roles: string[]): ReturnType<typeof SetMetadata> =>
	SetMetadata('roles', roles)
