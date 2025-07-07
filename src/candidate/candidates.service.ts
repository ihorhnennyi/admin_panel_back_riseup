import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateCandidateDto } from './dto/create-candidate.dto'
import { UpdateCandidateDto } from './dto/update-candidate.dto'
import { Candidate, CandidateDocument } from './schemas/candidate.schema'

@Injectable()
export class CandidatesService {
	constructor(
		@InjectModel(Candidate.name)
		private readonly candidateModel: Model<CandidateDocument>
	) {}

	async findAll(
		currentUser: any,
		own: boolean,
		query: {
			page?: number
			limit?: number
			city?: string
			status?: string
			source?: string
			gender?: string
			isActive?: string | boolean
			search?: string
			recruiter?: string | string[]
			startDate?: string
			endDate?: string
		}
	): Promise<{ data: Candidate[]; total: number }> {
		const isAdmin = currentUser.role === 'admin'
		const filter: any = {}

		if (own && !isAdmin) {
			filter.createdBy = new Types.ObjectId(currentUser.sub)
		} else if (query.recruiter) {
			const recruiterId = Array.isArray(query.recruiter)
				? query.recruiter[0]
				: query.recruiter
			if (Types.ObjectId.isValid(recruiterId)) {
				filter.createdBy = new Types.ObjectId(recruiterId)
			} else {
				throw new NotFoundException('Некорректный ID рекрутера')
			}
		}

		if (query.city && Types.ObjectId.isValid(query.city)) {
			filter.city = new Types.ObjectId(query.city)
		}
		if (query.status && Types.ObjectId.isValid(query.status)) {
			filter.status = new Types.ObjectId(query.status)
		}
		if (query.source && Types.ObjectId.isValid(query.source)) {
			filter.source = new Types.ObjectId(query.source)
		}
		if (query.gender) filter.gender = query.gender

		if (query.isActive !== undefined && query.isActive !== '') {
			filter.isActive = query.isActive === true || query.isActive === 'true'
		}

		if (query.startDate || query.endDate) {
			filter.createdAt = {}
			if (query.startDate) filter.createdAt.$gte = new Date(query.startDate)
			if (query.endDate) filter.createdAt.$lte = new Date(query.endDate)
		}

		if (query.search) {
			const regex = new RegExp(query.search, 'i')
			filter.$or = [
				{ firstName: regex },
				{ lastName: regex },
				{ middleName: regex },
				{ email: regex },
				{ phone: regex },
				{ position: regex },
			]
		}

		const page = Math.max(Number(query.page) || 1, 1)
		const limit = Math.max(Number(query.limit) || 10, 1)
		const skip = (page - 1) * limit

		const [data, total] = await Promise.all([
			this.candidateModel
				.find(filter)
				.populate('city source status createdBy')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit),
			this.candidateModel.countDocuments(filter),
		])

		return { data, total }
	}

	async findById(id: string, currentUser: any): Promise<Candidate> {
		const candidate = await this.candidateModel
			.findById(id)
			.populate('city source status createdBy')

		if (!candidate) throw new NotFoundException('Кандидат не найден')

		if (
			currentUser.role !== 'admin' &&
			candidate.createdBy.toString() !== currentUser.sub
		) {
			throw new ForbiddenException('Нет доступа к этому кандидату')
		}

		return candidate
	}

	async create(dto: CreateCandidateDto, currentUser: any): Promise<Candidate> {
		const candidate = new this.candidateModel({
			...dto,
			city: new Types.ObjectId(dto.city),
			status: new Types.ObjectId(dto.status),
			source: dto.source ? new Types.ObjectId(dto.source) : undefined,
			createdBy: new Types.ObjectId(currentUser.sub),
		})

		return candidate.save()
	}

	async update(
		id: string,
		dto: UpdateCandidateDto,
		currentUser: any
	): Promise<Candidate> {
		const candidate = await this.candidateModel.findById(id)

		if (!candidate) throw new NotFoundException('Кандидат не найден')

		if (
			currentUser.role !== 'admin' &&
			candidate.createdBy.toString() !== currentUser.sub
		) {
			throw new ForbiddenException('Нет доступа к обновлению')
		}

		// Обновляем поля с преобразованием ObjectId
		Object.assign(candidate, {
			...dto,
			city: dto.city ? new Types.ObjectId(dto.city) : candidate.city,
			status: dto.status ? new Types.ObjectId(dto.status) : candidate.status,
			source: dto.source ? new Types.ObjectId(dto.source) : candidate.source,
		})

		return candidate.save()
	}

	async remove(id: string, currentUser: any) {
		const candidate = await this.candidateModel.findById(id)

		if (!candidate) throw new NotFoundException('Кандидат не найден')

		if (
			currentUser.role !== 'admin' &&
			candidate.createdBy.toString() !== currentUser.sub
		) {
			throw new ForbiddenException('Нет доступа к удалению')
		}

		await candidate.deleteOne()
		return { message: 'Кандидат удалён' }
	}
}
