import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CandidatesController } from './candidates.controller'
import { CandidatesService } from './candidates.service'
import { Candidate, CandidateSchema } from './schemas/candidate.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Candidate.name, schema: CandidateSchema },
		]),
	],
	controllers: [CandidatesController],
	providers: [CandidatesService],
})
export class CandidatesModule {}
