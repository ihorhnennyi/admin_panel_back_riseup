import { ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEmail,
	IsIn,
	IsMongoId,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator'
import { Role } from '../../shared/constants/roles.constant'

export class UpdateUserDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	lastName?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	middleName?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEmail()
	email?: string

	@ApiPropertyOptional()
	@IsOptional()
	@MinLength(6)
	password?: string

	@ApiPropertyOptional({ enum: Object.values(Role) })
	@IsOptional()
	@IsIn(Object.values(Role))
	role?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsMongoId()
	city?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsMongoId()
	branch?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	phone?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	viber?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	whatsapp?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	facebook?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	telegram?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	position?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	birthDate?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isActive?: boolean

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	photoUrl?: string

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	languages?: string[]

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	skills?: string[]

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	workSchedule?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	employmentType?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	startDate?: string

	@ApiPropertyOptional()
	@IsOptional()
	experienceYears?: number

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	specializations?: string[]

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	linkedinUrl?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	identificationNumber?: string

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	certificates?: string[]

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	supervisor?: string

	@ApiPropertyOptional({ type: [String] })
	@IsOptional()
	@IsArray()
	responsibilities?: string[]

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	emergencyContact?: string
}
