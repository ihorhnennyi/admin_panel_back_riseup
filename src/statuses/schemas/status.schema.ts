import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Status {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({ required: true })
	color: string

	@Prop({ default: '', trim: true })
	description: string
}

export type StatusDocument = Status & Document
export const StatusSchema = SchemaFactory.createForClass(Status)
