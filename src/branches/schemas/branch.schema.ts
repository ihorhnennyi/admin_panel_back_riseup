import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { City } from '../../cities/schemas/city.schema'

/**
 * Модель филиала (Branch)
 * Привязана к городу через ObjectId
 */
@Schema({ timestamps: true }) // Автоматически добавляет createdAt и updatedAt
export class Branch {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({ default: '', trim: true })
	description: string

	@Prop({
		type: Types.ObjectId,
		ref: City.name,
		required: true,
	})
	city: Types.ObjectId
}

export type BranchDocument = Branch & Document
export const BranchSchema = SchemaFactory.createForClass(Branch)
