import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateStatusDto } from './dto/create-status.dto'
import { UpdateStatusDto } from './dto/update-status.dto'
import { Status, StatusDocument } from './schemas/status.schema'

@Injectable()
export class StatusesService {
	constructor(
		@InjectModel(Status.name)
		private readonly model: Model<StatusDocument>
	) {}

	/**
	 * Получить все статусы
	 */
	async findAll(): Promise<Status[]> {
		return this.model.find().exec()
	}

	/**
	 * Найти статус по ID
	 * @param id - ObjectId статуса
	 * @throws NotFoundException если статус не найден
	 */
	async findById(id: string): Promise<Status> {
		const status = await this.model.findById(id).exec()
		if (!status) {
			throw new NotFoundException('Статус не найден')
		}
		return status
	}

	/**
	 * Создать новый статус
	 * @param dto - данные нового статуса
	 * @throws ConflictException если статус с таким именем уже существует
	 */
	async create(dto: CreateStatusDto): Promise<Status> {
		const exists = await this.model.findOne({ name: dto.name })
		if (exists) {
			throw new ConflictException('Статус с таким именем уже существует')
		}

		const status = new this.model({
			name: dto.name,
			color: dto.color,
			description: dto.description || '',
		})

		return status.save()
	}

	/**
	 * Обновить статус по ID
	 * @param id - ObjectId
	 * @param dto - новые данные
	 * @throws NotFoundException если статус не найден
	 */
	async update(id: string, dto: UpdateStatusDto): Promise<Status> {
		const updated = await this.model.findByIdAndUpdate(id, dto, {
			new: true,
		})
		if (!updated) {
			throw new NotFoundException('Статус не найден')
		}
		return updated
	}

	/**
	 * Удалить статус по ID
	 */
	async remove(id: string): Promise<Status | null> {
		return this.model.findByIdAndDelete(id)
	}
}
