import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type StatusType = 'initial' | 'interview' | 'final' | 'custom'

@Schema({ timestamps: true })
export class Status {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({ required: true })
	color: string

	@Prop({ default: '', trim: true })
	description: string

	@Prop({ required: true })
	order: number

	@Prop({ required: true, enum: ['initial', 'interview', 'final', 'custom'] })
	type: StatusType

	@Prop({ default: false })
	isDefault: boolean

	@Prop({ default: true })
	isActive: boolean
}

export type StatusDocument = Status & Document
export const StatusSchema = SchemaFactory.createForClass(Status)
