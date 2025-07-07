// src/modules/candidates/schemas/candidate.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Candidate {
	@Prop({ required: true })
	firstName: string

	@Prop()
	lastName?: string

	@Prop()
	middleName?: string

	@Prop()
	email?: string

	@Prop()
	phone?: string

	@Prop()
	age?: number

	@Prop()
	position?: string

	@Prop()
	salary?: number

	@Prop({ type: Types.ObjectId, ref: 'City', required: true })
	city: Types.ObjectId

	@Prop({ type: Types.ObjectId, ref: 'Source' })
	source?: Types.ObjectId

	@Prop({ type: Types.ObjectId, ref: 'Status', required: true })
	status: Types.ObjectId

	@Prop()
	description?: string

	@Prop()
	employmentType?: string

	@Prop()
	gender?: string

	@Prop({ default: true })
	isActive: boolean

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	createdBy: Types.ObjectId
}

export type CandidateDocument = Candidate & Document
export const CandidateSchema = SchemaFactory.createForClass(Candidate)
