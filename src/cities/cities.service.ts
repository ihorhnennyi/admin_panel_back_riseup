import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCityDto } from './dto/create-city.dto'
import { UpdateCityDto } from './dto/update-city.dto'
import { City, CityDocument } from './schemas/city.schema'

@Injectable()
export class CitiesService {
	constructor(
		@InjectModel(City.name)
		private readonly cityModel: Model<CityDocument>
	) {}

	/**
	 * Создание нового города.
	 * Проверка на уникальность по имени.
	 */
	async create(dto: CreateCityDto) {
		const exists = await this.cityModel.findOne({ name: dto.name })
		if (exists) {
			throw new ConflictException('Город с таким названием уже существует')
		}

		const city = new this.cityModel(dto)
		return city.save()
	}

	/**
	 * Получить список всех городов.
	 */
	findAll() {
		return this.cityModel.find()
	}

	/**
	 * Получить город по ID.
	 * @throws NotFoundException если не найден.
	 */
	async findOne(id: string) {
		const city = await this.cityModel.findById(id)
		if (!city) {
			throw new NotFoundException('Город не найден')
		}
		return city
	}

	/**
	 * Обновить данные города.
	 * @throws NotFoundException если не найден.
	 */
	async update(id: string, dto: UpdateCityDto) {
		const city = await this.cityModel.findByIdAndUpdate(id, dto, { new: true })
		if (!city) {
			throw new NotFoundException('Город не найден')
		}
		return city
	}

	/**
	 * Удалить город по ID.
	 */
	remove(id: string) {
		return this.cityModel.findByIdAndDelete(id)
	}
}
