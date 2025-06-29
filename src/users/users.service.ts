import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcryptjs'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>
	) {}

	async findAll() {
		return this.userModel.find().select('-password')
	}

	async findById(id: string) {
		const user = await this.userModel.findById(id).select('-password')
		if (!user) throw new NotFoundException('User not found')
		return user
	}

	async create(dto: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(dto.password, 10)
		const user = new this.userModel({
			...dto,
			password: hashedPassword,
		})
		return user.save()
	}

	async update(id: string, dto: UpdateUserDto, currentUser: any) {
		const user = await this.userModel.findById(id)
		if (!user) throw new NotFoundException('User not found')

		const isAdmin = currentUser.role === 'admin'
		const isSelf = currentUser.sub === id

		if (!isAdmin && !isSelf) {
			throw new ForbiddenException('You can only update your own profile')
		}

		if (!isAdmin && dto.role && dto.role !== user.role) {
			throw new ForbiddenException('You cannot change your role')
		}

		if (dto.password) {
			dto.password = await bcrypt.hash(dto.password, 10)
		}

		Object.assign(user, dto)
		await user.save()

		const result = user.toObject() as any
		delete result.password

		return result
	}

	async remove(id: string) {
		return this.userModel.findByIdAndDelete(id)
	}
}
