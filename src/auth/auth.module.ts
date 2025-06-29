import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from '../users/schemas/user.schema'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('jwt.secret') || 'default_jwt_secret',
				signOptions: {
					expiresIn: config.get<string>('jwt.expiresIn') || '1d',
				},
			}),
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
