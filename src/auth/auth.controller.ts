import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { TokenResponseDto } from './dto/token-response.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtPayload } from './types/jwt-payload.interface'
import { TokenResponse } from './types/token-response.interface'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Регистрация нового пользователя' })
	@ApiResponse({
		status: 201,
		description:
			'Пользователь успешно зарегистрирован. Возвращается access и refresh токен.',
		type: TokenResponseDto,
	})
	@ApiResponse({
		status: 409,
		description: 'Пользователь с таким email уже существует.',
	})
	@Post('register')
	register(@Body() dto: RegisterDto): Promise<TokenResponse> {
		return this.authService.register(dto)
	}

	@ApiOperation({ summary: 'Вход в систему (логин)' })
	@ApiResponse({
		status: 200,
		description: 'Успешная авторизация. Возвращается access и refresh токен.',
		type: TokenResponseDto,
	})
	@ApiResponse({
		status: 401,
		description: 'Неверный email или пароль.',
	})
	@Post('login')
	login(@Body() dto: LoginDto): Promise<TokenResponse> {
		return this.authService.login(dto)
	}

	@ApiOperation({ summary: 'Обновление access токена через refresh токен' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				refreshToken: {
					type: 'string',
					example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
				},
			},
			required: ['refreshToken'],
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Токены успешно обновлены.',
		type: TokenResponseDto,
	})
	@ApiResponse({
		status: 401,
		description: 'Неверный или отсутствующий refresh токен.',
	})
	@Post('refresh')
	refresh(@Body('refreshToken') refreshToken: string): Promise<TokenResponse> {
		return this.authService.refresh(refreshToken)
	}

	@ApiOperation({ summary: 'Выход из системы (удаление refresh токена)' })
	@ApiBearerAuth('bearerAuth')
	@UseGuards(JwtAuthGuard)
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно вышел из системы.',
	})
	@ApiResponse({
		status: 401,
		description: 'Отсутствует или недействительный access токен.',
	})
	@Post('logout')
	logout(@CurrentUser() user: JwtPayload) {
		return this.authService.logout(user.sub)
	}

	@ApiOperation({ summary: 'Получение информации о текущем пользователе' })
	@ApiBearerAuth('bearerAuth')
	@UseGuards(JwtAuthGuard)
	@ApiResponse({
		status: 200,
		description: 'Информация о текущем пользователе.',
	})
	@ApiResponse({
		status: 401,
		description: 'Access токен не предоставлен или недействителен.',
	})
	@Get('me')
	getMe(@CurrentUser() user: JwtPayload) {
		return this.authService.getMe(user.sub)
	}
}
