import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AnalyticsController } from './analytics.controller'
import { AnalyticsService } from './analytics.service'

import {
	Candidate,
	CandidateSchema,
} from '../candidate/schemas/candidate.schema'
import { User, UserSchema } from '../users/schemas/user.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Candidate.name, schema: CandidateSchema },
			{ name: User.name, schema: UserSchema }, // 👈 добавь эту строку
		]),
	],
	controllers: [AnalyticsController],
	providers: [AnalyticsService],
})
export class AnalyticsModule {}
