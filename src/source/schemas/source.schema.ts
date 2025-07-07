import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Source {
	@Prop({ required: true, trim: true, unique: true })
	name: string

	@Prop({ required: true })
	color: string

	@Prop({ default: '', trim: true })
	description: string
}

export type SourceDocument = Source & Document
export const SourceSchema = SchemaFactory.createForClass(Source)
