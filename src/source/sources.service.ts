import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateSourceDto } from './dto/create-source.dto'
import { UpdateSourceDto } from './dto/update-source.dto'
import { Source, SourceDocument } from './schemas/source.schema'

@Injectable()
export class SourcesService {
	constructor(
		@InjectModel(Source.name)
		private readonly model: Model<SourceDocument>
	) {}

	/**
	 * Получить все источники
	 */
	async findAll(): Promise<Source[]> {
		return this.model.find().sort({ order: 1 }).exec()
	}

	/**
	 * Найти источник по ID
	 */
	async findById(id: string): Promise<Source> {
		const source = await this.model.findById(id).exec()
		if (!source) {
			throw new NotFoundException('Источник не найден')
		}
		return source
	}

	/**
	 * Создать новый источник
	 */
	async create(dto: CreateSourceDto): Promise<Source> {
		const exists: SourceDocument | null = await this.model.findOne({
			name: dto.name,
		})
		if (exists) {
			throw new ConflictException('Источник с таким именем уже существует')
		}

		const source = new this.model({
			...dto,
		})

		return source.save()
	}

	/**
	 * Обновить источник по ID
	 */
	async update(id: string, dto: UpdateSourceDto): Promise<Source> {
		if (dto.name) {
			const exists: SourceDocument | null = await this.model
				.findOne({ name: dto.name })
				.exec()

			if (exists && (exists._id as any).toString() !== id) {
				throw new ConflictException('Источник с таким именем уже существует')
			}
		}

		const updated = await this.model.findByIdAndUpdate(id, dto, {
			new: true,
		})

		if (!updated) {
			throw new NotFoundException('Источник не найден')
		}

		return updated
	}

	/**
	 * Удалить источник по ID
	 */
	async remove(id: string): Promise<Source | null> {
		return this.model.findByIdAndDelete(id)
	}
}
