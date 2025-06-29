import { Role } from 'src/shared/constants/roles.constant'

/**
 * Payload, который будет внутри access/refresh токенов
 */
export interface JwtPayload {
	sub: string
	email: string
	role: Role
}

/**
 * Ответ от сервиса авторизации при login / register / refresh
 */
export interface TokenResponse {
	accessToken: string
	refreshToken: string
	user: {
		_id: string
		email: string
		name: string
		role: Role
	}
}
