import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import configuration from './config/configuration'

import { AuthModule } from './auth/auth.module'
import { BranchesModule } from './branches/branches.module'
import { CitiesModule } from './cities/cities.module'
import { StatusesModule } from './statuses/statuses.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		MongooseModule.forRootAsync({
			useFactory: (config: ConfigService) => ({
				uri: config.get<string>('database.uri'),
			}),
			inject: [ConfigService],
		}),

		AuthModule,
		UsersModule,
		CitiesModule,
		BranchesModule,
		StatusesModule,
	],
})
export class AppModule {}
