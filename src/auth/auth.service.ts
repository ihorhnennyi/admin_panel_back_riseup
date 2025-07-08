import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcryptjs'
import { Model } from 'mongoose'
import { Role } from '../shared/constants/roles.constant'
import { User, UserDocument } from '../users/schemas/user.schema'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtPayload, TokenResponse } from './types/jwt-payload.interface'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService
	) {}

	// 🔐 Регистрация пользователя
	async register(dto: RegisterDto): Promise<TokenResponse> {
		const existingUser = await this.userModel.findOne({ email: dto.email })
		if (existingUser) {
			throw new ConflictException('Пользователь с таким email уже существует')
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10)

		const newUser = await this.userModel.create({
			...dto,
			password: hashedPassword,
			role: Role.RECRUITER,
		})

		return this.generateTokens(newUser)
	}

	// 🔑 Авторизация пользователя
	async login(dto: LoginDto): Promise<TokenResponse> {
		const user = await this.userModel.findOne({ email: dto.email })
		if (!user) {
			throw new UnauthorizedException('Неверные данные для входа')
		}

		const isPasswordValid = await bcrypt.compare(dto.password, user.password)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Неверные данные для входа')
		}

		return this.generateTokens(user)
	}

	// 🔁 Обновление access токена по refresh токену
	async refresh(refreshToken: string): Promise<TokenResponse> {
		if (!refreshToken) {
			throw new UnauthorizedException('Отсутствует refresh токен')
		}

		let payload: JwtPayload

		try {
			payload = this.jwtService.verify(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			})
		} catch {
			throw new UnauthorizedException('Недействительный refresh токен')
		}

		const user = await this.userModel.findById(payload.sub)
		if (!user || user.refreshToken !== refreshToken) {
			throw new UnauthorizedException('Refresh токен не совпадает')
		}

		return this.generateTokens(user)
	}

	// 🚪 Выход из системы (очистка refresh токена)
	async logout(userId: string): Promise<{ success: true }> {
		await this.userModel.updateOne({ _id: userId }, { refreshToken: null })
		return { success: true }
	}

	// 🎫 Генерация access и refresh токенов + сохранение refresh токена в БД
	private async generateTokens(user: UserDocument): Promise<TokenResponse> {
		const payload: JwtPayload = {
			sub: (user._id as unknown as string).toString(),
			email: user.email,
			role: user.role,
		}

		const accessToken = this.jwtService.sign(payload, {
			expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
		})

		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
		})

		await this.userModel.updateOne({ _id: user._id }, { refreshToken })

		return {
			accessToken,
			refreshToken,
			user: {
				_id: (user._id as unknown as string).toString(),
				email: user.email,
				name: user.name,
				role: user.role,
			},
		}
	}

	async getMe(userId: string) {
		const user = await this.userModel
			.findById(userId)
			.select('-password -refreshToken')
			.lean()

		return user
	}
}
