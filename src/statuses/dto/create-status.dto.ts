import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'

// Используем enum, чтобы ограничить допустимые типы статуса
export enum StatusType {
	INITIAL = 'initial',
	INTERVIEW = 'interview',
	FINAL = 'final',
	CUSTOM = 'custom',
}

export class CreateStatusDto {
	@ApiProperty({ example: 'На рассмотрении', description: 'Название статуса' })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({
		example: '#FFD700',
		description: 'Цвет статуса в HEX-формате',
	})
	@IsNotEmpty()
	@IsString()
	color: string

	@ApiPropertyOptional({
		example: 'Кандидат находится на стадии рассмотрения резюме',
		description: 'Дополнительное описание статуса',
	})
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({
		example: 1,
		description: 'Порядок отображения статуса',
	})
	@IsOptional()
	@IsNumber()
	order?: number

	@ApiPropertyOptional({
		enum: StatusType,
		example: StatusType.INITIAL,
		description: 'Тип статуса (этап процесса найма)',
	})
	@IsOptional()
	@IsEnum(StatusType)
	type?: StatusType

	@ApiPropertyOptional({
		example: false,
		description: 'Является ли статус дефолтным при создании кандидата',
	})
	@IsOptional()
	@IsBoolean()
	isDefault?: boolean

	@ApiPropertyOptional({
		example: true,
		description: 'Показывается ли статус в системе',
	})
	@IsOptional()
	@IsBoolean()
	isActive?: boolean
}
