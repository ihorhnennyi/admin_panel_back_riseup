import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
	Candidate,
	CandidateDocument,
} from '../candidate/schemas/candidate.schema'
import { User, UserDocument } from '../users/schemas/user.schema'

@Injectable()
export class AnalyticsService {
	constructor(
		@InjectModel(Candidate.name)
		private readonly candidateModel: Model<CandidateDocument>,

		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>
	) {}

	async getCandidatesSummary() {
		const [statuses, cities, sources] = await Promise.all([
			this.groupByField('status'),
			this.groupByField('city'),
			this.groupByField('source'),
		])

		return {
			statuses,
			cities,
			sources,
		}
	}

	private async groupByField(field: 'status' | 'city' | 'source') {
		const lookupMap = {
			status: 'status',
			city: 'cities',
			source: 'sources',
		}

		const fieldCollection = lookupMap[field]

		return this.candidateModel.aggregate([
			{
				$match: {
					[field]: { $ne: null },
				},
			},
			{
				$group: {
					_id: `$${field}`,
					count: { $sum: 1 },
				},
			},
			{
				$lookup: {
					from: fieldCollection,
					let: { id: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$_id', { $toObjectId: '$$id' }],
								},
							},
						},
					],
					as: 'info',
				},
			},
			{ $unwind: '$info' },
			{
				$project: {
					label: '$info.name',
					color: '$info.color',
					value: '$count',
				},
			},
		])
	}

	// Получение количества кандидатов по дням за 30 дней
	async getCandidatesLeadsByDays(days = 30) {
		const fromDate = new Date()
		fromDate.setDate(fromDate.getDate() - days)

		return this.candidateModel.aggregate([
			{
				$match: {
					createdAt: { $gte: fromDate }, // фильтр по дате создания
				},
			},
			{
				$group: {
					_id: {
						$dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
					},
					leads: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } },
			{
				$project: {
					date: '$_id',
					leads: 1,
					_id: 0,
				},
			},
		])
	}

	async getRecruitersStatusSummary(startDate?: string, endDate?: string) {
		const match: any = {
			createdBy: { $ne: null },
			status: { $ne: null },
		}

		if (startDate || endDate) {
			match.createdAt = {}
			if (startDate) {
				match.createdAt.$gte = new Date(startDate)
			}
			if (endDate) {
				match.createdAt.$lte = new Date(endDate)
			}
		}

		const pipeline = [
			{ $match: match },
			{
				$group: {
					_id: {
						user: '$createdBy',
						status: '$status',
					},
					count: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: '$_id.user',
					statusCounts: {
						$push: {
							status: '$_id.status',
							count: '$count',
						},
					},
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: '_id',
					as: 'user',
				},
			},
			{ $unwind: '$user' },
			{
				$project: {
					id: { $toString: '$user._id' },
					recruiter: '$user.name',
					statusCounts: {
						$arrayToObject: {
							$map: {
								input: '$statusCounts',
								as: 'sc',
								in: {
									k: { $toString: '$$sc.status' },
									v: '$$sc.count',
								},
							},
						},
					},
				},
			},
		]

		return this.candidateModel.aggregate(pipeline)
	}

	async getRecruiterActivityChartData(startDate?: string, endDate?: string) {
		const now = new Date()
		const monthAgo = new Date()
		monthAgo.setDate(now.getDate() - 30)

		const from = startDate ? new Date(startDate) : monthAgo
		const to = endDate ? new Date(endDate) : now

		const recruiters = await this.userModel
			.find({ roles: 'recruiter' })
			.select('_id name lastName')
			.lean()

		const rawData = await this.candidateModel.aggregate([
			{
				$match: {
					createdAt: { $gte: from, $lte: to },
					createdBy: { $ne: null },
				},
			},
			{
				$group: {
					_id: {
						date: {
							$dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
						},
						recruiter: '$createdBy',
					},
					count: { $sum: 1 },
				},
			},
		])

		const statsMap: Record<string, Record<string, number>> = {}
		for (const item of rawData) {
			const date = item._id.date
			const recruiterId = item._id.recruiter.toString()
			const count = item.count

			if (!statsMap[date]) statsMap[date] = {}
			statsMap[date][recruiterId] = count
		}

		const dates: string[] = []
		const current = new Date(from)
		while (current <= to) {
			dates.push(current.toISOString().slice(0, 10))
			current.setDate(current.getDate() + 1)
		}

		const result = dates.map(date => {
			const row: Record<string, any> = { date }

			for (const recruiter of recruiters) {
				const recruiterId = recruiter._id.toString()
				const fullName = `${recruiter.name} ${recruiter.lastName}`.trim()
				row[fullName] = statsMap[date]?.[recruiterId] ?? 0
			}

			return row
		})

		return result
	}
}
