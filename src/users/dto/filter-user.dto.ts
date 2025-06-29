import { IsOptional, IsString } from 'class-validator'
import { PaginateDto } from '../../shared/dto/paginate.dto'

export class FilterUserDto extends PaginateDto {
	@IsOptional()
	@IsString()
	search?: string
}
