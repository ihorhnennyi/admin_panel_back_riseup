import { PartialType } from '@nestjs/swagger'
import { CreateBranchDto } from './create-branch.dto'

/**
 * DTO для обновления филиала.
 * Наследует все поля из CreateBranchDto, делает их необязательными.
 */
export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
