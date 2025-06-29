import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'

/**
 * DTO для создания филиала
 */
export class CreateBranchDto {
	@ApiProperty({
		example: 'Центральный офис',
		description: 'Название филиала',
	})
	@IsNotEmpty({ message: 'Название филиала обязательно' })
	@IsString()
	name: string

	@ApiProperty({
		example: 'Главный филиал в центре города',
		description: 'Описание филиала (необязательно)',
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string

	@ApiProperty({
		example: '60d0fe4f5311236168a109ca',
		description: 'ID города, к которому привязан филиал',
	})
	@IsMongoId({ message: 'city должен быть валидным Mongo ObjectId' })
	city: string
}
