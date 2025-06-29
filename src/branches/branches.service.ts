import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateBranchDto } from './dto/create-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'
import { Branch, BranchDocument } from './schemas/branch.schema'

@Injectable()
export class BranchesService {
	constructor(
		@InjectModel(Branch.name)
		private readonly branchModel: Model<BranchDocument>
	) {}

	/**
	 * Получение списка всех филиалов с городом
	 */
	async findAll() {
		return this.branchModel.find().populate('city')
	}

	/**
	 * Получение филиала по ID
	 * @throws NotFoundException если филиал не найден
	 */
	async findById(id: string) {
		const branch = await this.branchModel.findById(id).populate('city')
		if (!branch) throw new NotFoundException('Филиал не найден')
		return branch
	}

	/**
	 * Создание нового филиала
	 */
	async create(dto: CreateBranchDto) {
		return this.branchModel.create(dto)
	}

	/**
	 * Обновление данных филиала
	 * @throws NotFoundException если филиал не найден
	 */
	async update(id: string, dto: UpdateBranchDto) {
		const branch = await this.branchModel.findById(id)
		if (!branch) throw new NotFoundException('Филиал не найден')

		Object.assign(branch, dto)
		return branch.save()
	}

	/**
	 * Удаление филиала по ID
	 */
	async remove(id: string) {
		return this.branchModel.findByIdAndDelete(id)
	}
}
